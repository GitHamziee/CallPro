# R4Referral — Call Center Website

## Project Overview
B2B call center services website with marketing pages and authenticated portal for managing real estate leads, QA agents, clients, packages, and invoicing.

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
npx prisma db push --url "$DATABASE_URL"   # Push schema to DB (no migrations)
npx prisma generate  # Regenerate Prisma client
npx prisma studio    # Open Prisma Studio GUI
npx tsx prisma/seed.ts  # Seed database
stripe listen --forward-to localhost:3000/api/stripe/webhook  # Stripe webhook forwarding
```

---

## Public Pages — `app/(marketing)/`
Layout: Navbar + Footer. No auth required.

### `/` — Homepage
Hero section with CharReveal text animation, MagneticButton CTA, AnimatedCounter stats bar. Sections: services overview, how-it-works process, testimonials carousel, final CTA.

### `/services` — Services
Service cards for outbound calling, appointment setting, lead qualification, and CRM management. Process flow diagram.

### `/pricing` — Pricing Plans
Fetches package prices from DB at runtime via `/api/packages`. Renders `PricingCards` component with feature comparison. Shows actual DB prices. Includes FAQ accordion section.

### `/about` — About Us
Company mission statement, team section, brand story for R4Referral.

### `/contact` — Contact Form
Contact form UI only — **has no API endpoint**, submissions go nowhere.

### `/privacy-policy` — Privacy Policy
Legal document: data collection, usage, disclosure, user rights, California privacy rights.

### `/terms-of-service` — Terms of Service
Legal document: service definitions, payment terms, refunds, liability, termination, arbitration.

### `/refund-policy` — Refund Policy
Refund eligibility, non-refundable items, request procedures, processing times.

---

## Auth Pages — `app/(auth)/`
Standalone layout (no sidebar/navbar).

### `/login` — Login
Email + password login. Password visibility toggle. "Remember me" checkbox. Links to forgot-password and register. Shows success message after new registration redirect.

### `/register` — Register
Full registration form:
- Full Name, Phone, Email, Password (min 8 chars + uppercase + number)
- License No (optional), Brokerage (optional)
- Target Areas (required free text)
- State (required — searchable dropdown of all US states)
- Account Executive (optional — referral/sales rep name)
- Terms & Privacy agreement checkbox

### `/forgot-password` — Forgot Password
Email input → sends reset link via Resend (1-hour token expiry). Shows success state with email confirmation message.

### `/reset-password` — Reset Password
New password + confirm password with visibility toggle. Validates token from URL query param. Shows success state and auto-redirects to login.

---

## User Portal — `app/(auth)/(portal)/`
Layout: Sidebar + TopBar. Requires `role === "USER"` or `role === "AGENT"` (varies per page).

### `/dashboard` — Dashboard (All Roles)
Role-conditional content:
- **USER**: Current plan name, package cost, subscription status, expiry date, link to packages
- **AGENT (QA)**: Total leads submitted, leads this month, leads today, submit lead CTA
- **ADMIN**: User count, new registrations this month, active subscriptions, monthly revenue, recent registrations list, link to admin portal

### `/settings` — Settings (All Roles)
Three tabs:
- **Account**: Edit Name, Email, Phone, License No, Brokerage, Target Areas, State (searchable dropdown), Account Executive
- **Security**: Change password (requires current password + new password + confirm)
- **Billing** (USER only): Active subscription name + start/expiry date. Button to navigate to /packages

### `/packages` — Packages (USER only)
Lists all active DB packages with prices, descriptions, features. Shows "Current Plan" badge on active subscription. Subscribe buttons trigger Stripe checkout. Shows subscription expiry date if active. Handles Stripe payment success/cancel redirect.

### `/my-leads` — My Leads (USER only)
Stats bar: Pending / Accepted / Invoiced / Paid counts.
Status filter pills (All / Pending / Accepted / Invoiced / Paid).
Paginated lead table: Lead name, type badge (Buyer/Seller), masked phone (PENDING), QA agent, status badge, action buttons.
Actions per status:
- **PENDING**: Accept + Decline buttons. Contact details masked (phone/email) at API level
- **ACCEPTED**: No action (waiting for admin invoice — unless auto-invoiced)
- **INVOICED**: "Pay Invoice" button → Stripe Checkout
- **PAID**: View only

Lead detail modal:
- **PENDING leads**: Locked preview panel (masked contact, accept/decline in footer)
- **Accepted/Invoiced/Paid**: Full details — name, type, phone, email, address, property type, beds/baths, timeline, contract status, appointment time, notes, QA agent, invoice info

Auto-billing on accept:
- **PAY_PER_LEAD package**: Creates invoice for `user.leadCost` (set by admin per user)
- **SUBSCRIPTION package**: Auto-marks lead as PAID via package name
- If `leadCost = 0`: No auto-invoice, admin invoices manually

### `/leads/submit` — Submit Lead (AGENT only)
Lead submission form:
- Lead Type (Buyer / Seller toggle)
- Name, Phone, Email (optional), Address
- Property Type, Beds/Baths, Timeline
- Contract Status (Yes / No toggle)
- Appointment Date/Time (datetime picker)
- Notes (optional textarea)

Supports edit mode: `?edit=<leadId>` — loads existing lead data. Only NEW status leads can be edited.

### `/leads/history` — Lead History (AGENT only)
Stats: Total leads submitted, this month, today.
Search by name or email/phone.
Paginated table: Lead name, type badge, phone, address, appointment date, status badge, submitted date.
Edit button shown for NEW status leads (links to `/leads/submit?edit=id`).
Lead detail modal: Full lead information read-only view.

---

## Admin Portal — `app/(auth)/(admin)/admin/`
Layout: Dark sidebar (slate-900) + AdminTopBar. Requires `role === "ADMIN"`.

### `/admin` — Admin Root
Redirects to `/admin/users`.

### `/admin/users` — User Management
Stats row: Total users, Admins count, QA count, Active clients count.
Search bar + Role filter (All / Clients / QA / Admins).
Paginated table: Avatar initials, Name, Email, Role badge (Client/QA/Admin), Assigned leads count, Active subscription badge, Join date.
Click row → navigates to `/admin/users/[id]`.

### `/admin/users/[id]` — User Detail
Profile header with avatar, name, email, role badge, phone, join date, subscription status.
Role switcher: Client / QA / Admin toggle (requires confirmation dialog).
Profile Details card (shown if any field populated): Account Executive, State, Target Areas, License No, Brokerage.
Change Password card: New password input (min 8 chars, uppercase, lowercase, number). Signs user out after change.
Lead Cost card (USER role only): Dollar amount input → sets `user.leadCost` in cents. Used for auto-invoicing on lead accept for PAY_PER_LEAD package users. Set to $0.00 for manual invoicing.
Purchase History: List of all purchases with package name, date, expiry, price, status badge. Active subscription has hover-to-cancel button (requires confirmation).

### `/admin/leads` — Lead Management
Stats: Total, New, Pending, Accepted, Invoiced, Paid counts.
Search (name/phone/email) + QA filter dropdown + Status filter (desktop pills, mobile dropdown).
Paginated table: Lead name, type badge, phone/email, QA agent, status badge, action button column.
Action buttons per status:
- **NEW**: "Assign" button → opens assign modal (dropdown of subscribed users)
- **ACCEPTED**: "Send Invoice" button → opens invoice modal (custom $ amount input)
- **INVOICED**: Shows invoice amount, no action
- **PAID**: Shows paid amount, no action

Lead detail modal: Full lead info including agent, assignee, invoice details.
Assign modal: Search subscribed users, select, confirm assignment (moves lead NEW → PENDING).
Invoice modal: Enter dollar amount → creates invoice and moves lead ACCEPTED → INVOICED.

### `/admin/packages` — Package Management
Package count display.
Desktop table + mobile card layout.
Per package row:
- **Name**: Read-only
- **Price**: Click $ amount → inline edit input (number, step 0.01). Save (✓) / Cancel (✗). Enter key saves, Escape cancels.
- **Type**: Clickable badge toggles SUBSCRIPTION ↔ PAY_PER_LEAD. Blue = Subscription, Amber = Pay Per Lead. Spinner while saving.
- **Status**: Active / Inactive badge (read-only)
- **Active Subs**: Count of active purchases for this package

### `/admin/subscriptions` — Subscription Management
Stats: Total, Active, Expired, Cancelled counts.
Search by name, email, or account executive (referral).
Status filter pills: All / Active / Expired / Cancelled.
Paginated table: User avatar + name + email, Package name, Status badge (green/amber/red), Account Executive, Purchase date.
Click user name → links to `/admin/users/[id]`.

### `/admin/analytics` — Revenue Analytics
Month navigation (← Previous / Next →) with current month display.
3 metric cards: All-time total revenue, Selected month revenue, Selected month sales count.
12-month bar chart: Interactive bars, current month highlighted, hover shows revenue. Month labels on X axis.
Per-package breakdown table: Package name, Price, Sales count, Total revenue. Mobile card layout.

### `/admin/agents` (QA Management)
Create QA Account form: Name, Email, Password → creates AGENT role user.
QA list: Avatar initials, Name, Email, Leads submitted count, Join date.

---

## API Routes — `app/api/`

### Auth — `/api/auth/`
| Route | Method | Purpose |
|-------|--------|---------|
| `[...nextauth]` | GET/POST | NextAuth handler — JWT, credentials, role callbacks, 5-min token revalidation |
| `register` | POST | Create USER account — hashes password, stores all registration fields |
| `profile` | GET | Return authenticated user's full profile |
| `update-profile` | PATCH | Update name, email, phone, licenseNo, brokerage, targetAreas, state, accountExecutive |
| `change-password` | POST | Verify current password → hash + save new password |
| `forgot-password` | POST | Generate reset token (1hr) → send email via Resend |
| `reset-password` | POST | Validate token → set new password, invalidate token |

### Agent Leads — `/api/leads/`
| Route | Method | Purpose |
|-------|--------|---------|
| `leads` | POST | AGENT: Submit new lead (status = NEW) |
| `leads` | GET | AGENT: Own lead history with pagination + search |
| `leads/[id]` | GET | AGENT: Fetch single lead detail |
| `leads/[id]` | PATCH | AGENT: Edit lead fields (only if status = NEW) |

### User Lead Actions — `/api/my-leads/`
| Route | Method | Purpose |
|-------|--------|---------|
| `my-leads` | GET | USER: Assigned leads with pagination, status filter, masking for PENDING, stats |
| `my-leads` | PATCH | USER: accept (PENDING→ACCEPTED + auto-billing) or decline (PENDING→NEW) |

### Packages — `/api/packages/`
| Route | Method | Purpose |
|-------|--------|---------|
| `packages` | GET | Public: Active packages list (used by /pricing and /packages portal) |

### Invoices — `/api/invoices/`
| Route | Method | Purpose |
|-------|--------|---------|
| `invoices/checkout` | POST | USER: Create Stripe checkout session for an invoice → returns redirect URL |

### Stripe — `/api/stripe/`
| Route | Method | Purpose |
|-------|--------|---------|
| `stripe/checkout` | POST | USER: Create Stripe checkout session for package subscription → returns redirect URL |
| `stripe/webhook` | POST | Stripe: Handle `checkout.session.completed` → create/update Purchase record in DB |

### Admin — `/api/admin/`
| Route | Method | Purpose |
|-------|--------|---------|
| `admin/users` | GET | Paginated user list with search + role filter + stats |
| `admin/users/[id]` | GET | Full user detail: profile, purchases, metadata |
| `admin/users/[id]` | PATCH | Update role / password / leadCost / cancel subscription |
| `admin/leads` | GET | All leads with search, agent filter, status filter, pagination, stats |
| `admin/leads/[id]` | GET | Single lead detail |
| `admin/leads/[id]` | PATCH | Assign to user / create invoice / update status |
| `admin/packages` | GET | Packages list with type and active subscription counts |
| `admin/packages` | PATCH | Update package price or type |
| `admin/subscriptions` | GET | All purchases with search, status filter, pagination, stats |
| `admin/analytics` | GET | Revenue: all-time, monthly, 12-month trend, per-package breakdown |
| `admin/stats` | GET | Dashboard stats: user counts, revenue, new subs, recent registrations |
| `admin/agents` | GET | List AGENT role users with lead counts |
| `admin/agents` | POST | Create new AGENT role account |
| `admin/subscribed-users` | GET | Users with active purchases (for assign dropdown) |

---

## Hooks — `hooks/`
All state management and data fetching. Pages import hooks and render UI only.

| Hook | Purpose |
|------|---------|
| `useRegister.ts` | Registration form state, validation, state dropdown search, submission |
| `useSettings.ts` | Profile fetch + update, password change, tab state, state dropdown |
| `usePackages.ts` | Package listing, active subscription detection, Stripe checkout |
| `useSubmitLead.ts` | Lead form state, edit mode detection, lead fetch for edit, submission |
| `useLeadHistory.ts` | Agent leads fetch, search, pagination, stats (total/month/today) |
| `useMyLeads.ts` | User leads fetch, pagination, status filter, accept/decline/pay, stats, selectedLead modal |
| `useAdminUsers.ts` | User list fetch, search, role filter, pagination, stats |
| `useAdminUserDetail.ts` | User detail fetch, role change (with confirm), password reset, subscription cancel (with confirm), leadCost save |
| `useAdminLeads.ts` | Lead list fetch, search, agent/status filters, pagination, stats, assign modal, invoice modal |
| `useAdminPackages.ts` | Package list fetch, inline price editing (edit/save/cancel/keyboard), type toggle |
| `useAdminSubscriptions.ts` | Subscription list fetch, search, status filter, pagination, stats |
| `useAdminAnalytics.ts` | Analytics fetch, month navigation, 12-month chart data, per-package breakdown |

---

## Key Library Files — `lib/`

| File | Purpose |
|------|---------|
| `lib/auth.ts` | NextAuth config — JWT strategy, credentials provider, role/tokenVersion in token, 5-min revalidation |
| `lib/prisma.ts` | Prisma client singleton with pg adapter |
| `lib/constants.ts` | Marketing copy, nav links, PRICING_PLANS, US_STATES array, US_STATE_MAP |
| `lib/validation.ts` | Email, password, name validation helpers |
| `lib/api-utils.ts` | requireAdmin / requireAgent / requireUser auth guards, applyRateLimit (in-memory) |
| `lib/format-utils.ts` | timeAgo, getInitials, getAvatarColor, LEAD_STATUS_BADGES |
| `lib/purchase-utils.ts` | getActivePurchase, expireStaleSubscriptions (lazy expiry check) |
| `lib/lead-utils.ts` | assignLeadToUser, acceptLead, declineLead, getSubscribedUsers |
| `lib/invoice-utils.ts` | createInvoice (creates Invoice record + sets lead to INVOICED), markLeadPaidByPackage (sets lead to PAID with description) |

---

## Database Models — `prisma/schema.prisma`

| Model | Key Fields |
|-------|-----------|
| `User` | id, name, email, password, phone, licenseNo, brokerage, targetAreas, state, accountExecutive, role (USER/AGENT/ADMIN), leadCost (cents, default 0), tokenVersion |
| `Package` | id, name, price (cents), description, features[], durationDays, type (SUBSCRIPTION/PAY_PER_LEAD), isActive, sortOrder, stripePriceId |
| `Purchase` | id, userId, packageId, status (ACTIVE/CANCELLED/EXPIRED), stripeSessionId, expiresAt |
| `Lead` | id, agentId, assignedToId, leadType, name, phone, email, address, propertyType, bedsBaths, timeline, contractStatus, appointmentTime, notes, status (NEW/PENDING/ACCEPTED/INVOICED/PAID) |
| `Invoice` | id, leadId, amount (cents), description, status (PENDING/PAID), stripeSessionId, paidAt |
| `PasswordResetToken` | id, token, userId, expiresAt, usedAt |
| `StripeLog` | id, event, sessionId, userId, metadata, response, error, status |

---

## Auth & Roles

- Three roles: `USER` (client, receives leads), `AGENT` (QA, submits leads), `ADMIN`
- JWT strategy — role, name, id, tokenVersion embedded in token
- Token revalidation every 5 minutes (checks DB for role/version changes — invalidates on role/password change)
- Middleware protects: `/dashboard`, `/settings`, `/packages`, `/admin/*`, `/leads/*`, `/my-leads`
- In UI: AGENT role displayed as "QA", USER role displayed as "Client"

---

## Billing System

### Package Types
| Type | On Lead Accept | Use Case |
|------|---------------|----------|
| `SUBSCRIPTION` | Auto-mark lead PAID (`markLeadPaidByPackage`) | Leads included in plan |
| `PAY_PER_LEAD` | Auto-create invoice for `user.leadCost` (if > 0) | Pay per accepted lead |

### Lead Cost (`user.leadCost`)
- Set by admin per user in Admin → Users → [id] → Lead Cost card
- Stored in cents (e.g., 10000 = $100.00)
- Only used for PAY_PER_LEAD package users
- `0` = no auto-invoice, admin invoices manually via Admin → Leads → "Send Invoice"

### Lead Status Flow
```
NEW → PENDING (assigned to user)
PENDING → ACCEPTED (user accepts) → triggers auto-billing
PENDING → NEW (user declines, clears assignment)
ACCEPTED → INVOICED (invoice created, manually or auto)
INVOICED → PAID (Stripe payment completed via webhook)
```

### Contact Masking
PENDING leads: phone and email masked at API level (e.g., `•••••1234`, `j••••@gmail.com`). Revealed only after user accepts.

---

## Design Tokens
- Brand: blue (`brand-600: #2563eb`)
- Accent: purple (`accent-600: #9333ea`)
- Section dark: `#172554` (deep blue)
- Gradient: blue→purple (`.btn-gradient` — animated shimmer + underglow)
- Portal bg: `slate-50`
- Admin sidebar: `slate-900`

---

## Environment Variables
```
DATABASE_URL=                        # Neon PostgreSQL connection string
NEXTAUTH_SECRET=                     # JWT signing secret
NEXTAUTH_URL=                        # http://localhost:3000 (dev)
STRIPE_SECRET_KEY=                   # Stripe secret key
STRIPE_WEBHOOK_SECRET=               # Stripe webhook signing secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe publishable key
RESEND_API_KEY=                      # Resend email service API key
```

---

## Conventions
- Business logic in `hooks/`, UI in page files — keep them separate
- All marketing copy in `lib/constants.ts`
- Route groups `(marketing)`, `(auth)`, `(portal)`, `(admin)` keep layouts separate
- API routes return `{ error: "message" }` on failure or `{ data, message }` on success
- Prices stored in cents (e.g., 149900 = $1,499.00)
- Dates use UTC boundaries for consistency across environments
- Subscription expiry is **lazy** — checked on read, no cron job
- Rate limiting is **in-memory** — not shared across serverless instances
- No auto-commits unless explicitly asked
- No "cold calling" terminology — use "outbound calling" instead
- Any visual/UI change must be applied to ALL three portals (USER portal, QA/AGENT portal, ADMIN portal)
