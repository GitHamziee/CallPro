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
│   ├── pricing/         # /pricing
│   ├── about/           # /about
│   ├── contact/         # /contact
│   └── *-policy/        # Legal pages (privacy, terms, refund)
├── (auth)/              # Auth-related pages
│   ├── login/           # Standalone login page
│   ├── register/        # Standalone register page
│   ├── forgot-password/ # Password reset request
│   ├── reset-password/  # Password reset with token
│   ├── (portal)/        # User portal (sidebar + topbar layout)
│   │   ├── dashboard/   # Role-conditional dashboard
│   │   ├── settings/    # Account, Security, Billing tabs
│   │   ├── packages/    # Package subscription (USER only)
│   │   ├── my-leads/    # Assigned leads (USER only)
│   │   └── leads/       # Submit + History (AGENT only)
│   └── (admin)/         # Admin portal (dark sidebar layout)
│       └── admin/
│           ├── users/   # User management + [id] detail
│           ├── leads/   # Lead management + assign/invoice
│           └── packages/
├── api/
│   ├── auth/            # NextAuth + register/profile/password/reset
│   ├── admin/           # Admin-only endpoints (users, leads, stats, invoices)
│   ├── packages/        # Public package listing
│   ├── leads/           # Agent lead CRUD
│   ├── my-leads/        # User lead actions
│   ├── invoices/        # Invoice Stripe checkout
│   └── stripe/          # Checkout + webhooks
└── globals.css          # Tailwind theme + custom utilities
```

## Key Files
- `lib/auth.ts` — NextAuth config (JWT, credentials provider, callbacks)
- `lib/prisma.ts` — Prisma client singleton with pg adapter
- `lib/constants.ts` — All marketing copy, nav links, pricing plans
- `lib/validation.ts` — Input validation (email, password, name)
- `lib/api-utils.ts` — API response helpers, auth guards
- `middleware.ts` — Server-side route protection (auth + role checks)
- `prisma/schema.prisma` — Database models
- `prisma/seed.ts` — Seed admin user + packages
- `components/portal/` — User portal UI (Sidebar, TopBar, SidebarContext)
- `components/admin/` — Admin portal UI (AdminSidebar, AdminTopBar)

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
- All data/copy in `lib/constants.ts` — easy to update
- Route groups `(marketing)`, `(auth)`, `(portal)`, `(admin)` keep layouts separate
- API routes use consistent `{ error: "message" }` or `{ data, message }` format
- Prices stored in cents (e.g., 149900 = $1,499.00)
- No auto-commits unless explicitly asked
