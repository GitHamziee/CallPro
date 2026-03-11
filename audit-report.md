# R4Referral — Full Codebase Audit Report

**Date**: March 12, 2026
**Scope**: Performance, Security, Database, Architecture, Scalability
**Files Analyzed**: 90+ (26 API routes, 15 hooks, 40+ components, Prisma schema, middleware, config)

---

## Executive Summary

The application is **functionally solid** with good security fundamentals (JWT auth, rate limiting, input validation, bcrypt, Stripe signature verification). Recent optimizations (search debounce, loading skeletons, `skipStats` polling, database indexes, `groupBy` aggregations) have addressed several performance issues.

**However, 5 critical issues remain** that will cause failures at scale or result in revenue loss:

1. **Admin stats endpoint fetches ALL purchases into memory** — will OOM at scale
2. **Lead accept + auto-invoice is not atomic** — revenue leak on failure
3. **Lazy subscription expiry has a race condition** — inconsistent state
4. **Polling race conditions in 2 hooks** — stale data overwrites fresh data
5. **~80KB of unnecessary JS shipped on every page** — slow load times

Fixing these 5 issues should be the immediate priority. The remaining 17 issues are ordered by impact below.

---

## 1. Performance Bottlenecks

### P1 — CRITICAL: Admin Stats Fetches All Purchases Into Memory

**File**: [admin/stats/route.ts:54-56](app/api/admin/stats/route.ts#L54-L56)
**Impact**: Endpoint timeout / OOM at 10K+ purchases

```typescript
// CURRENT — O(n) memory, loads every purchase
const allTimeRevenue = await prisma.purchase.findMany({
  select: { package: { select: { price: true } } },
});
const totalRevenue = allTimeRevenue.reduce((sum, p) => sum + p.package.price, 0);
```

```typescript
// FIX — O(packages) memory, database does the work
const [allPackages, purchaseCounts] = await Promise.all([
  prisma.package.findMany({ select: { id: true, price: true } }),
  prisma.purchase.groupBy({ by: ["packageId"], _count: { _all: true } }),
]);
const priceMap = new Map(allPackages.map((p) => [p.id, p.price]));
const totalRevenue = purchaseCounts.reduce(
  (sum, g) => sum + (priceMap.get(g.packageId) ?? 0) * g._count._all, 0
);
```

---

### P2 — CRITICAL: Lead Accept + Auto-Invoice Not Atomic

**File**: [my-leads/route.ts:127-166](app/api/my-leads/route.ts#L127-L166)
**Impact**: Lead marked ACCEPTED but no invoice created = revenue lost

```
Current flow:
  1. acceptLead() → status = ACCEPTED     ✓ succeeds
  2. createInvoice() → INVOICED           ✗ fails silently
  Result: Lead stuck in ACCEPTED, no payment prompt
```

```typescript
// FIX — wrap in transaction
const result = await prisma.$transaction(async (tx) => {
  const lead = await tx.lead.update({
    where: { id: leadId, status: "PENDING", assignedToId: userId },
    data: { status: "ACCEPTED" },
  });

  const userData = await tx.user.findUnique({
    where: { id: userId },
    select: { leadCost: true, purchases: { where: { status: "ACTIVE", ... }, take: 1,
      select: { package: { select: { name: true, type: true } } } } },
  });

  const pkg = userData?.purchases?.[0]?.package;
  if (pkg?.type === "PAY_PER_LEAD" && userData?.leadCost > 0) {
    await tx.invoice.create({ data: { leadId, amount: userData.leadCost } });
    await tx.lead.update({ where: { id: leadId }, data: { status: "INVOICED" } });
  } else if (pkg?.type === "SUBSCRIPTION") {
    await tx.invoice.create({ data: { leadId, amount: 0, description: `Paid via Package: ${pkg.name}`, status: "PAID", paidAt: new Date() } });
    await tx.lead.update({ where: { id: leadId }, data: { status: "PAID" } });
  }

  return lead;
});
```

---

### P3 — CRITICAL: Lazy Subscription Expiry Race Condition

**File**: [purchase-utils.ts:28-34](lib/purchase-utils.ts#L28-L34)
**Impact**: Two concurrent requests both see ACTIVE, both attempt update

```typescript
// CURRENT — fetch then check then update (3 steps, race-prone)
const purchase = await prisma.purchase.findFirst({ where: { userId, status: "ACTIVE" } });
if (purchase.expiresAt && new Date() > purchase.expiresAt) {
  await prisma.purchase.update({ where: { id: purchase.id }, data: { status: "EXPIRED" } });
  return null;
}
```

```typescript
// FIX — filter expired in WHERE clause (1 step, atomic)
export async function getActivePurchase(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      status: "ACTIVE",
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    select: { id: true, status: true, packageId: true, expiresAt: true, createdAt: true,
      package: { select: { name: true, price: true } } },
    orderBy: { createdAt: "desc" },
  });
  return purchase || null;
}
```

---

### P4 — HIGH: Polling Race Conditions in Hooks

**Files**: [useMyLeads.ts:90-106](hooks/useMyLeads.ts#L90-L106), [useAdminLeads.ts:118-134](hooks/useAdminLeads.ts#L118-L134)
**Impact**: 30s poll returns stale data that overwrites a fresh accept/decline response

When user accepts a lead and the 30s poll is in-flight simultaneously, the poll's older response arrives second and overwrites the fresh data.

```typescript
// FIX — add AbortController to cancel stale fetches
const abortRef = useRef<AbortController | null>(null);

const fetchLeads = useCallback(async (silent = false) => {
  abortRef.current?.abort();
  abortRef.current = new AbortController();

  const res = await fetch(`/api/my-leads?${params}`, {
    signal: abortRef.current.signal,
  });
  // ... rest of fetch logic
}, [page, statusFilter]);

useEffect(() => () => abortRef.current?.abort(), []);
```

---

### P5 — HIGH: ~80KB Unnecessary JS on Every Page

**Source**: Framer Motion (~40KB), lucide-react icons (~12KB per page), SSR'd modals (~12KB HTML)

| Source | Size (gzipped) | Fix |
|--------|---------------|-----|
| Framer Motion in 6+ components | ~40KB | Dynamic import below-fold animations |
| 17 lucide icons per page | ~12KB | `optimizePackageImports` in next.config |
| Modal JSX always rendered | ~12KB | `dynamic(() => ..., { ssr: false })` |
| Empty next.config.ts | ~15KB | Enable compress, optimizePackageImports |

```typescript
// next.config.ts — add these settings
const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};
```

```typescript
// Homepage — lazy load below-fold sections
import dynamic from "next/dynamic";
const StatsBar = dynamic(() => import("@/components/home/StatsBar"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const ServicesOverview = dynamic(() => import("@/components/home/ServicesOverview"));
```

---

### P6 — HIGH: Missing Compound Database Indexes

**File**: [schema.prisma:159-185](prisma/schema.prisma#L159-L185)
**Impact**: Full table scans on filtered lead queries at 10K+ rows

```prisma
// ADD to Lead model
@@index([assignedToId, status])  // my-leads pagination
@@index([agentId, createdAt])    // lead history queries
@@index([status, createdAt])     // admin lead stats
```

---

### P7 — HIGH: Admin Leads Uses `include` Instead of `select`

**File**: [admin/leads/route.ts:42-47](app/api/admin/leads/route.ts#L42-L47)
**Impact**: Over-fetches lead fields; leaks any future schema additions

```typescript
// CURRENT
include: {
  agent: { select: { id: true, name: true, email: true } },
  assignedTo: { select: { id: true, name: true, email: true } },
  invoice: { select: { id: true, amount: true, status: true, paidAt: true } },
},

// FIX — use top-level select (same pattern as my-leads route)
select: {
  id: true, leadType: true, name: true, phone: true, email: true,
  address: true, status: true, createdAt: true, appointmentTime: true,
  agent: { select: { id: true, name: true, email: true } },
  assignedTo: { select: { id: true, name: true, email: true } },
  invoice: { select: { id: true, amount: true, status: true, paidAt: true } },
},
```

---

### P8 — MEDIUM: Database Pool Not Configured

**File**: [prisma.ts:13-19](lib/prisma.ts#L13-L19)
**Impact**: Connection exhaustion under concurrent load

```typescript
// FIX — add explicit pool settings
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production" ? true : { rejectUnauthorized: false },
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});
```

---

## 2. Database Optimization Opportunities

### D1 — Add 3 Compound Indexes (5 min, high impact)

```prisma
// Lead model
@@index([assignedToId, status])
@@index([agentId, createdAt])
@@index([status, createdAt])
```

### D2 — Replace Unbounded Revenue Query (10 min)

Replace `purchase.findMany()` + JS reduce with `purchase.groupBy()` + price map in admin stats.

### D3 — Add Cleanup for Unbounded Tables (15 min)

```typescript
// Add to expireStaleSubscriptions() or admin stats endpoint
await prisma.passwordResetToken.deleteMany({
  where: { expiresAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
});
await prisma.stripeLog.deleteMany({
  where: { createdAt: { lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
});
```

### D4 — Configure Connection Pool (5 min)

Add `max: 20, min: 2, idleTimeoutMillis: 30000` to pg Pool constructor.

### D5 — Fix Lazy Expiry Pattern (10 min)

Move expiry check into WHERE clause instead of post-fetch application logic.

---

## 3. Security Vulnerabilities

### S1 — MEDIUM: Custom Package Info Leak

**File**: [packages/route.ts:24-37](app/api/packages/route.ts#L24-L37)
**Severity**: Medium

Public endpoint exposes custom package details if attacker guesses `userId` param.

```typescript
// FIX — require auth for userId param
if (userId) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || (session.user.id !== userId && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
```

### S2 — MEDIUM: Email Enumeration via Timing Attack

**File**: [forgot-password/route.ts:33-40](app/api/auth/forgot-password/route.ts#L33-L40)
**Severity**: Medium

DB lookup for existing email takes ~10ms; non-existing returns instantly. Attacker can time responses to enumerate valid emails despite identical response messages.

```typescript
// FIX — add constant-time padding
const start = Date.now();
const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
const elapsed = Date.now() - start;
if (elapsed < 100) await new Promise((r) => setTimeout(r, 100 - elapsed));
```

### S3 — LOW: Name Regex Rejects International Names

**File**: [validation.ts:4](lib/validation.ts#L4)

`/^[a-zA-Z\s'-]+$/` rejects José, François, Müller, etc.

```typescript
// FIX
const NAME_REGEX = /^[\p{L}\s'-]+$/u;
```

### S4 — LOW: Missing Security Headers

No Content-Security-Policy, X-Frame-Options, or Permissions-Policy headers configured.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
};
```

### Already Solid

- JWT with tokenVersion invalidation ✓
- bcrypt salt rounds 12 ✓
- Rate limiting on all sensitive endpoints ✓
- Stripe webhook signature verification ✓
- Input sanitization on all user inputs ✓
- Parameterized queries via Prisma ORM ✓
- CSRF mitigated by SameSite cookies ✓
- Self-XSS mitigated by sanitizeInput HTML stripping ✓

---

## 4. Code Quality Issues

### Q1 — Debounce Timers Not Cleaned on Unmount

**Files**: 4 hooks (`useAdminLeads`, `useAdminSubscriptions`, `useAdminUsers`, `useLeadHistory`)
**Impact**: React warning "Can't perform state update on unmounted component"

```typescript
// FIX — add cleanup
useEffect(() => () => clearTimeout(debounceRef.current), []);
```

### Q2 — Auth Layout Redundant useSession

**File**: [app/(auth)/layout.tsx](app/(auth)/layout.tsx)
**Impact**: Delays rendering of all auth pages; middleware already handles redirects

```typescript
// FIX — remove "use client" and useSession, simplify to:
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Q3 — Admin Analytics Month Bug at Year Boundary

**File**: [useAdminAnalytics.ts](hooks/useAdminAnalytics.ts)
**Impact**: `goToPrevMonth` on January creates invalid month

When `month = "2026-01"`, computing `m - 2` gives `-1`, which JavaScript's `Date.UTC` handles correctly (rolls back to previous year). This is actually fine — JavaScript Date handles negative months.

### Q4 — Missing Error State in useAdminAgents

**File**: [useAdminAgents.ts](hooks/useAdminAgents.ts)
**Impact**: If agent list fetch fails, no error feedback to user

---

## 5. Scalability Risks

### Scale1 — Lead Table Growth

No archival, soft-delete, or TTL strategy. At 1M+ leads, filtered queries degrade.

**Recommendation**: Add compound indexes now (immediate). Plan archival strategy for PAID leads older than 1 year (future).

### Scale2 — StripeLog Table Growth

Every Stripe event logged with no cleanup. At 10K events/day = 3.6M rows/year.

**Recommendation**: Add 90-day TTL cleanup in `expireStaleSubscriptions()`.

### Scale3 — In-Memory Rate Limiting

Rate limit store is per-process. In multi-instance deployment, each instance has its own counter.

**Recommendation**: Acceptable for current scale. Document limitation. Switch to Redis if deploying multiple instances.

### Scale4 — No Caching Layer for Static Data

Packages list fetched from DB on every page load but rarely changes.

**Recommendation**: Add in-memory cache with 5-min TTL for `/api/packages`.

---

## 6. Recommended Fixes — Priority Order

### Tier 1 — Fix Now (revenue/correctness impact)

| # | Fix | File | Effort | Impact |
|---|-----|------|--------|--------|
| 1 | Replace unbounded revenue query with groupBy | admin/stats/route.ts | 10 min | Prevents OOM |
| 2 | Wrap lead accept + invoice in $transaction | my-leads/route.ts | 20 min | Prevents revenue leak |
| 3 | Fix lazy expiry WHERE clause | purchase-utils.ts | 10 min | Fixes race condition |
| 4 | Add compound indexes to Lead | schema.prisma | 5 min | Speeds all lead queries |
| 5 | Add AbortController to polling hooks | useMyLeads, useAdminLeads | 15 min | Fixes stale data |

### Tier 2 — Fix This Week (performance)

| # | Fix | File | Effort | Impact |
|---|-----|------|--------|--------|
| 6 | Add next.config optimizations | next.config.ts | 5 min | -15KB bundle |
| 7 | Dynamic import below-fold homepage sections | (marketing)/page.tsx | 15 min | -40KB initial JS |
| 8 | Switch admin leads to `select` | admin/leads/route.ts | 10 min | Prevents field leaks |
| 9 | Configure pg Pool explicitly | lib/prisma.ts | 5 min | Prevents connection exhaustion |
| 10 | Add table cleanup for StripeLog + tokens | purchase-utils.ts | 10 min | Prevents unbounded growth |

### Tier 3 — Fix This Month (security/quality)

| # | Fix | File | Effort | Impact |
|---|-----|------|--------|--------|
| 11 | Require auth for custom package fetch | packages/route.ts | 10 min | Fixes info leak |
| 12 | Add timing padding to forgot-password | forgot-password/route.ts | 5 min | Prevents enumeration |
| 13 | Clean up debounce timers in 4 hooks | hooks/*.ts | 15 min | Fixes React warnings |
| 14 | Dynamic import modals | my-leads, lead-history pages | 15 min | -12KB HTML per page |
| 15 | Add security headers | next.config.ts | 5 min | Security hardening |
| 16 | Fix name regex for Unicode | validation.ts | 2 min | International names |
| 17 | Remove redundant useSession in auth layout | (auth)/layout.tsx | 5 min | Faster auth pages |

---

## 7. Quick Wins (< 5 min each, big impact)

1. **Add `optimizePackageImports` to next.config.ts** — instant icon tree-shaking
2. **Add 3 compound indexes** — `npx prisma db push` and done
3. **Configure pg Pool** — 3 lines of config
4. **Add `compress: true`** to next.config — automatic gzip
5. **Add security headers** — copy-paste to next.config
6. **Fix name regex** — one line change: `/^[\p{L}\s'-]+$/u`
7. **Add debounce cleanup** — one line per hook: `useEffect(() => () => clearTimeout(debounceRef.current), [])`

---

## Appendix: What's Already Well Done

The codebase has strong fundamentals. These patterns are solid:

- **Auth**: JWT + tokenVersion invalidation + 5-min revalidation
- **Rate limiting**: Applied to all sensitive endpoints
- **Input validation**: Comprehensive with email/phone/password/name validators
- **Stripe**: Webhook signature verification + idempotency keys + P2002 race handling + comprehensive logging
- **Database**: Explicit `select` on user-facing queries, `groupBy` for analytics, proper indexes on Purchase/Invoice
- **Frontend**: Loading skeletons, search debounce, batch state updates, skip-stats polling optimization
- **Security**: bcrypt(12), sanitizeInput(), parameterized queries, SameSite cookies
