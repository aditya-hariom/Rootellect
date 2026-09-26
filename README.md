# Rootellect Wellness - Technical Assessment Demo

> **Important Assessment Notice:** Assessment demo — no real purchases. This project is built for the technical assessment evaluation only. Disallow search engine indexing (`<meta name="robots" content="noindex" />`).

---

## 1. Project Scope & Architecture

### Functional Requirements Tracking (F1 – F7)
- [ ] **F1: Homepage & Shared Navigation**
  - Responsive desktop & mobile navigation with dynamic cart badge
  - Persistent assessment banner: *"Assessment demo — no real purchases"*
  - Hero introduction, featured formulas, bundle spotlight, short on-page About, FAQ & Returns
- [ ] **F2: Product Catalogue**
  - 4 fixed formulas loaded from structured database
  - Instant text search (by name & benefit) + Category filtering + Empty state
- [ ] **F3: Product Detail Pages (`/products/[slug]`)**
  - Reusable dynamic template for all 4 slugs
  - 1-bottle (₹799), 2-bottle (₹1,499), 3-bottle (₹2,099) toggles
  - Dynamic bottle count, total price & genuine savings calculation
  - Graceful 404 / unavailable handling
- [ ] **F4: Duo Bundles**
  - Mind Calm + 1 of 3 partner formulas = **₹1,399** (₹199 savings vs ₹1,598 separate purchase)
  - Identifiable bundle cart representation
- [ ] **F5: Persistent Cart**
  - Quantity modifications with variant distinction (a quantity of 2 on a 2-bottle pack = 4 bottles total)
  - Browser `localStorage` persistence across page reloads
  - **Review Benchmark:** 1 Mind Calm 2-pack (₹1,499) + 1 Women Balance Duo (₹1,399) = **₹2,898** (3 Mind Calm + 1 Women Balance bottles)
- [ ] **F6: Guest Checkout & Simulated Order Flow**
  - Fictional customer details with `"Prefill Demo Data"`
  - Server-side order calculation (frontend never dictates final price)
  - Prisma database persistence with price snapshot and reference ID
  - Explicit **Simulate Success** and **Simulate Failure** actions (cart preserved on failure)
  - Double-click submission prevention
- [ ] **F7: Original Differentiator — Transparent Supply-Value Calculator**
  - Interactive daily cost & duration breakdown on pack selector (e.g. ₹23.32/day on 3-pack vs ₹26.63/day on 1-pack)

---

## 2. Technical Stack
- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS (Custom design system: `#1E3A2F` Forest Green, `#8FA382` Sage, `#F9F6F0` Warm Sand)
- **Database & ORM:** Prisma ORM with SQLite (zero-config local dev & tests) / PostgreSQL compatible
- **Testing:** Playwright & Vitest automated test suite
- **Deployment:** Vercel

---

## 3. Data Flow & Security Principles
1. **Zero Client Trust:** The checkout endpoint receives only `productId/bundleId`, `packType`, and `quantity`. Prices are calculated entirely on the server using trusted DB records.
2. **Deterministic Order Reference:** Generates unique order references (e.g., `ORD-2026-XXXX`).
3. **Resilient Failure Simulation:** Failed payments do not create database orders and preserve the customer's cart so they can retry seamlessly.

---

## 4. Setup & Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Setup database and apply migrations
npx prisma db push

# 3. Seed catalogue fixtures
npm run db:seed

# 4. Start local development server
npm run dev

# 5. Run automated test suite
npm run test
```

---

## 5. AI Usage Disclosure
- **Human-led visual decisions:** Information hierarchy, typography pairing, color palette (`#1E3A2F` / `#8FA382`), and wireframes designed manually as documented in `design-direction.md`.
- **AI-Assisted tasks:** Boilerplate scaffolding, Tailwind utility adjustments, automated test assertion drafting, and database query optimization.
- **Verification:** All generated code and calculations are verified against the assessment rubric and unit tests.