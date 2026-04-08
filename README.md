# Lead Generation & Call Center Management Platform

A full-stack B2B lead generation and call center management platform built for a client in the real estate industry. The platform connects QA agents who qualify leads with real estate professionals who receive and act on them — with a complete billing system, admin dashboard, and public marketing site.

---

## Overview

This project was built as a freelance engagement for a client who needed an end-to-end solution for managing outbound calling operations, lead distribution, and client billing. The platform serves three distinct user roles — **Clients**, **QA Agents**, and **Admins** — each with their own dedicated portal and workflow.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js (App Router) with TypeScript |
| **Styling** | Tailwind CSS, Framer Motion, shadcn/ui |
| **Authentication** | NextAuth.js (JWT, credentials provider, role-based access) |
| **Database** | PostgreSQL (Neon) with Prisma ORM |
| **Payments** | Stripe (Checkout Sessions + Webhooks) |
| **Email** | Resend (transactional emails) |

---

## Features

### Public Marketing Site
- Animated landing page with stats, service overview, and how-it-works sections
- Pricing page that dynamically pulls package data from the database
- Contact form, about page, and legal pages (Privacy Policy, Terms of Service, Refund Policy)

### Client Portal
- **Dashboard** — Active subscription status, package details, and expiry tracking
- **My Leads** — View assigned leads, accept/decline with masked contact info until accepted, pay invoices via Stripe
- **Packages** — Browse available plans, subscribe via Stripe checkout, manage active subscription
- **Settings** — Profile management, password change, billing overview

### QA Agent Portal
- **Lead Submission** — Structured form for submitting qualified leads (buyer/seller type, property details, appointment scheduling)
- **Lead History** — Searchable, paginated history of all submitted leads with edit capability for new leads
- **Dashboard** — Submission stats (total, this month, today)

### Admin Portal
- **User Management** — Full CRUD for all users, role switching, per-user lead cost configuration, password resets, subscription cancellation
- **Lead Management** — Assign leads to clients, send invoices, track lead status through the full lifecycle (New → Pending → Accepted → Invoiced → Paid)
- **Package Management** — Inline price editing, package type toggling (Subscription vs Pay-Per-Lead)
- **Subscription Management** — Track all purchases with status filtering and search
- **Revenue Analytics** — Monthly revenue charts, per-package breakdowns, all-time and monthly totals
- **QA Management** — Create and manage QA agent accounts

---

## Billing System

| Package Type | Behavior on Lead Accept |
|-------------|------------------------|
| **Subscription** | Leads automatically marked as paid |
| **Pay-Per-Lead** | Auto-invoicing based on admin-configured per-user lead cost |
| **Manual** | Admin can send custom invoices for any accepted lead |

**Lead Lifecycle:**
```
New → Pending (assigned to client) → Accepted → Invoiced → Paid
```

- Stripe checkout sessions with webhook-driven status updates
- Contact info masked on pending leads (revealed only after acceptance)

---

## Security & Auth

- Role-based access control (Client, QA Agent, Admin) with middleware protection
- JWT tokens with 5-minute revalidation against the database
- Password reset flow with time-limited tokens
- API-level rate limiting

---

## Architecture Highlights

- **Separation of concerns** — Business logic in custom hooks, UI in page/component files, utilities in lib/
- **Lazy subscription expiry** — Checked on read rather than via scheduled jobs
- **Dynamic pricing** — Prices stored in DB and rendered at runtime, not hardcoded
- **Fully responsive** — Mobile-optimized layouts across all portals (card views, dropdown filters)

---

## Project Structure

```
app/
├── (marketing)/        # Public pages (home, services, pricing, about, contact, legal)
├── (auth)/             # Login, register, forgot/reset password
│   ├── (portal)/       # Client & QA agent portal pages
│   └── (admin)/        # Admin portal pages
├── api/                # REST API routes
components/             # Reusable UI components
hooks/                  # Custom hooks (data fetching + state management)
lib/                    # Auth config, DB client, utilities, validation
prisma/                 # Database schema and seed script
```
