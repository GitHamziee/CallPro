# CallPro — Call Center Website

## Project Overview
B2B call center services website with marketing pages and authenticated portal.
Placeholder branding "CallPro" — client will replace.

## Tech Stack
- **Framework**: Next.js 16 (App Router), TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion, shadcn/ui, Lucide React
- **Auth**: NextAuth.js v4 (JWT strategy, credentials provider)
- **ORM**: Prisma 7 with `@prisma/adapter-pg` (PostgreSQL via pg Pool)
- **Database**: PostgreSQL (Neon — pooled connection)
- **Payments**: Stripe (Checkout + Webhooks)
- **Email**: Resend (password reset emails)

## Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npx prisma db push   # Push schema to DB (no migrations)
npx prisma generate  # Regenerate Prisma client
npx prisma studio    # Open Prisma Studio GUI
npx tsx prisma/seed.ts  # Seed database
```

## Project Structure
```
app/
├── (marketing)/         # Public pages with Navbar + Footer
│   ├── page.tsx         # Homepage
│   ├── services/        # /services
│   ├── pricing/         # /pricing (fetches DB prices via /api/packages)
│   ├── about/           # /about
│   ├── contact/         # /contact
│   └── *-policy/        # Legal pages (privacy, terms, refund)
├── (auth)/              # Auth-related pages
│   ├── login/           # Standalone login page
│   ├── register/        # Registration (name, phone, email, password, licenseNo, brokerage, targetAreas, state, accountExecutive)
│   ├── forgot-password/ # Password reset request
│   ├── reset-password/  # Password reset with token
│   ├── (portal)/        # User portal (sidebar + topbar layout)
│   │   ├── dashboard/   # Role-conditional dashboard
│   │   ├── settings/    # Account, Security, Billing tabs
│   │   ├── packages/    # Package subscription (USER only)
│   │   ├── my-leads/    # Assigned leads (USER only)
│   │   └── leads/       # Submit + History + Edit (AGENT only)
│   └── (admin)/         # Admin portal (dark sidebar layout)
│       └── admin/
│           ├── users/       # User management + [id] detail (profile fields)
│           ├── leads/       # Lead management + assign/invoice
│           ├── packages/    # Package management (inline price editing)
│           ├── subscriptions/ # Subscription list (filter, search by referral)
│           └── analytics/   # Revenue metrics, per-package breakdown, 12-month trend
├── api/
│   ├── auth/            # NextAuth + register/profile/password/reset
│   ├── admin/           # Admin-only: users, leads, stats, invoices, subscriptions, analytics, packages
│   ├── packages/        # Public package listing
│   ├── leads/           # Agent lead CRUD (POST + GET list + GET/PATCH [id])
│   ├── my-leads/        # User lead actions
│   ├── invoices/        # Invoice Stripe checkout
│   └── stripe/          # Checkout + webhooks
└── globals.css          # Tailwind theme + custom utilities
```

## Key Files
- `lib/auth.ts` — NextAuth config (JWT, credentials provider, callbacks)
- `lib/prisma.ts` — Prisma client singleton with pg adapter
- `lib/constants.ts` — Marketing copy, nav links, pricing plans, US_STATES, US_STATE_MAP
- `lib/validation.ts` — Input validation (email, password, name)
- `lib/api-utils.ts` — API response helpers, auth guards (requireAdmin, requireAgent, requireUser)
- `lib/format-utils.ts` — Shared formatters (timeAgo, getInitials, getAvatarColor, LEAD_STATUS_BADGES)
- `lib/purchase-utils.ts` — Subscription helpers (getActivePurchase, expireStaleSubscriptions)
- `middleware.ts` — Server-side route protection (auth + role checks)
- `prisma/schema.prisma` — Database models
- `prisma/seed.ts` — Seed admin user + packages
- `components/portal/` — User portal UI (Sidebar, TopBar, SidebarContext)
- `components/admin/` — Admin portal UI (AdminSidebar, AdminTopBar)

## Hooks (Business Logic)
All data fetching and state management lives in `hooks/`:
- `useRegister.ts` — Registration form (all fields + state dropdown)
- `useSettings.ts` — Settings form (fetches profile from /api/auth/profile)
- `usePackages.ts` — Portal package listing + Stripe subscribe
- `useSubmitLead.ts` — Lead submit + edit mode (via ?edit=id query param)
- `useLeadHistory.ts` — Agent lead history with search + pagination
- `useMyLeads.ts` — User assigned leads
- `useAdminUsers.ts` — Admin user list with search/role filter
- `useAdminUserDetail.ts` — Admin user detail + actions
- `useAdminLeads.ts` — Admin lead management
- `useAdminSubscriptions.ts` — Admin subscription list with status filter
- `useAdminAnalytics.ts` — Admin revenue analytics with month navigation
- `useAdminPackages.ts` — Admin package list with inline price editing

## Design Tokens
- Brand: blue (`brand-600: #2563eb`)
- Accent: purple (`accent-600: #9333ea`)
- Section dark: `#172554` (deep blue)
- Gradient: blue→purple (buttons, text accents)
- Portal bg: `slate-50`
- Admin sidebar: `slate-900`

## Auth & Roles
- Three roles: `USER` (default), `AGENT`, `ADMIN`
- JWT strategy — role, name, id, tokenVersion embedded in token
- Token revalidation every 5 minutes (checks DB for role/version changes)
- Middleware protects `/dashboard`, `/settings`, `/packages`, `/admin`, `/leads`, `/my-leads`
- Admin routes require `role === "ADMIN"`
- Agent routes (`/leads`) require `role === "AGENT"`
- User routes (`/my-leads`, `/packages`) require `role === "USER"`

## User Registration Fields
| Field | DB Column | Required | Notes |
|-------|-----------|----------|-------|
| Full Name | `name` | Yes | |
| Phone | `phone` | Yes | |
| Email | `email` | Yes | Unique |
| Password | `password` | Yes | Hashed with bcrypt |
| License No | `licenseNo` | No | |
| Brokerage | `brokerage` | No | |
| Target Areas | `targetAreas` | Yes | Free text |
| State | `state` | Yes | US state code (dropdown with search) |
| Account Executive | `accountExecutive` | No | Referral name |

## Admin Features
- **Users**: List, search, role filter, detail page (profile fields, subscriptions, password reset, role change)
- **Leads**: List, search, status/agent filter, assign to user, create invoice
- **Packages**: List with inline price editing (PATCH /api/admin/packages)
- **Subscriptions**: List with Active/Expired/Cancelled filter, search by referral
- **Analytics**: Revenue metrics (all-time, monthly), per-package sales breakdown, 12-month bar chart trend, month navigation

## Agent Features
- **Submit Lead**: Form with all lead fields (type, name, phone, email, address, property, beds/baths, timeline, contract status, appointment, notes)
- **Edit Lead**: Leads with status "NEW" can be edited via /leads/submit?edit=id
- **Lead History**: Paginated list with search, status badges, edit links for NEW leads

## Pricing System
- **DB packages** (Package model): name, price (cents), description, features[], durationDays, isActive, sortOrder, stripePriceId
- **Marketing copy** (lib/constants.ts): PRICING_PLANS has descriptions, features text, CTAs — prices fetched from DB at runtime
- **Portal** (/packages): Fetches from /api/packages, shows DB prices
- **Admin** (/admin/packages): Inline price editing, updates DB
- **Stripe**: One-time payments (not recurring), 30-day DB-level TTL via durationDays

## Environment Variables
```
DATABASE_URL=           # Neon PostgreSQL connection string
NEXTAUTH_SECRET=        # JWT signing secret
NEXTAUTH_URL=           # http://localhost:3000 (dev)
STRIPE_SECRET_KEY=      # Stripe secret key
STRIPE_WEBHOOK_SECRET=  # Stripe webhook signing secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe publishable key
RESEND_API_KEY=         # Resend email service API key
```

## Conventions
- Business logic in `hooks/`, UI in page files — keep them separate
- All marketing data/copy in `lib/constants.ts` — easy to update
- Route groups `(marketing)`, `(auth)`, `(portal)`, `(admin)` keep layouts separate
- API routes use consistent `{ error: "message" }` or `{ data, message }` format
- Prices stored in cents (e.g., 149900 = $1,499.00)
- Dates use UTC boundaries (Date.UTC + getUTC*) for consistency across environments
- No auto-commits unless explicitly asked
- No "cold calling" terminology — use "outbound calling" instead
