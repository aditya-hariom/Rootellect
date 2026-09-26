# Rootellect Wellness - Technical Assessment Demo

> **Important Assessment Notice:** Assessment demo — no real purchases. This project is built for the technical assessment evaluation only. Disallow search engine indexing (`<meta name="robots" content="noindex" />`).

---

## 1. Project Scope & Architecture

### Functional Requirements Tracking (F1 – F7)
- [x] **F1: Homepage & Shared Navigation**
  - Responsive desktop & mobile navigation with dynamic cart badge
  - Persistent assessment banner: *"Assessment demo — no real purchases"*
  - Hero introduction, featured formulas, bundle spotlight, short on-page About, FAQ & Returns
- [x] **F2: Product Catalogue**
  - 4 fixed formulas loaded from structured database
  - Instant text search (by name & benefit) + Category filtering + Empty state
- [x] **F3: Product Detail Pages (`/products/[slug]`)**
  - Reusable dynamic template for all 4 slugs
  - 1-bottle (₹799), 2-bottle (₹1,499), 3-bottle (₹2,099) toggles
  - Dynamic bottle count, total price & genuine savings calculation
  - Graceful 404 / unavailable handling
- [x] **F4: Duo Bundles**
  - Mind Calm + 1 of 3 partner formulas = **₹1,399** (₹199 savings vs ₹1,598 separate purchase)
  - Identifiable bundle cart representation
- [x] **F5: Persistent Cart**
  - Quantity modifications with variant distinction (a quantity of 2 on a 2-bottle pack = 4 bottles total)
  - Browser `localStorage` persistence across page reloads
  - **Review Benchmark:** 1 Mind Calm 2-pack (₹1,499) + 1 Women Balance Duo (₹1,399) = **₹2,898** (3 Mind Calm + 1 Women Balance bottles)
- [x] **F6: Guest Checkout & Simulated Order Flow**
  - Fictional customer details with `"Prefill Demo Data"`
  - Server-side order calculation (frontend never dictates final price)
  - Prisma database persistence with price snapshot and reference ID
  - Explicit **Simulate Success** and **Simulate Failure** actions (cart preserved on failure)
  - Double-click submission prevention
- [x] **F7: Original Differentiator — Transparent Supply-Value Calculator**
  - Interactive daily cost & duration breakdown on pack selector (e.g. ₹23.32/day on 3-pack vs ₹26.63/day on 1-pack)

---

## 2. Technical Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4 (Custom design tokens: `#1E3A2F` Forest Green, `#8FA382` Sage, `#FBF9F5` Warm Sand)
- **Database & ORM:** Prisma ORM with SQLite (zero-config local dev & tests; seamless PostgreSQL compatibility)
- **Testing:** Automated test suite with 10 passing tests across 3 suites
- **Deployment:** Vercel

---

## 3. Data Flow & Security Principles
1. **Zero Client Trust:** The checkout endpoint receives only `productId/partnerSlug`, `packType`, and `quantity`. Prices are calculated entirely on the server using trusted DB records.
2. **Deterministic Order Reference:** Generates unique order references (e.g., `ORD-2026-XXXX`).
3. **Resilient Failure Simulation:** Failed payments do not create database orders and preserve the customer's cart so they can retry seamlessly.

---

## 4. Setup & Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Setup database and apply migrations
npx prisma db push

# 3. Seed catalogue fixtures (4 required products)
npm run db:seed

# 4. Start local development server
npm run dev

# 5. Run automated test suite
npm run test
```

---

## 5. Automated Test Evidence
Run command: `npm test`
```text
▶ Check 1: Pack & Bundle Pricing Calculation Verification
  ✔ correctly calculates single formula pack discounts and savings (1.13ms)
  ✔ correctly calculates Duo Bundle savings vs separate purchase (0.15ms)
  ✔ PASSES SHARED REVIEW BENCHMARK: 1x Mind Calm 2-pack + 1x Duo Bundle = ₹2,898 and 4 bottles (0.13ms)
  ✔ enforces Quantity Rule: quantity of 2 on a 2-bottle pack = 4 bottles (0.12ms)
✔ Check 1: Pack & Bundle Pricing Calculation Verification (2.57ms)

▶ Check 2: Server-Side Validation & Tamper Rejection
  ✔ rejects negative quantities with clear error (28.15ms)
  ✔ rejects non-integer / floating-point quantities (1.48ms)
  ✔ rejects unknown or tampered product identifiers (1.41ms)
  ✔ rejects an empty checkout items array (0.24ms)
  ✔ handles intentional SIMULATE FAILURE action without creating order in DB (814.05ms)
✔ Check 2: Server-Side Validation & Tamper Rejection (849.22ms)

▶ Check 3: End-to-End Order Flow & Database Persistence
  ✔ processes shared benchmark items, calculates trusted totals, and persists order snapshot in DB (29.67ms)
✔ Check 3: End-to-End Order Flow & Database Persistence (31.89ms)

ℹ tests 10 | suites 3 | pass 10 | fail 0 | duration_ms 1091
```

### Manual Checklist & Review Results
- [x] **Mobile Layout (~375px):** Tested on iPhone SE / 375px viewport. Zero horizontal overflow. Navbar collapses into accessible mobile menu.
- [x] **Cart Refresh Persistence:** Added 2-pack Mind Calm + Duo Bundle, reloaded page (`F5`). Cart state and badge counter `2` remained intact from `localStorage`.
- [x] **Checkout Failure & Retry:** Triggered `Simulate Failure`. Error message displayed; cart retained ₹2,898 items. Clicked `Simulate Success` immediately afterward without re-adding items. Order created with reference ID.
- [x] **Keyboard Accessibility:** All buttons and interactive tabs have visible `:focus-visible` rings with full keyboard tab navigation.

---

## 6. AI Usage Disclosure
- **Human-led visual decisions:** Information hierarchy, typography pairing, color palette (`#1E3A2F` / `#8FA382`), and wireframes designed manually as documented in `design-direction.md`.
- **AI-Assisted tasks:** Next.js project scaffolding, Prisma seed schema alignment, Tailwind utility adjustments, and automated test assertion drafting.
- **Verification:** All generated code and calculations were verified via automated tests (`npm test`) and live browser end-to-end user journeys.