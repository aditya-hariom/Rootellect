# Rootellect Wellness — Technical Assessment Demo

> **Important Assessment Notice:** Assessment demo — no real purchases. This application is an independently designed, resilient wellness e-commerce demonstration created for the Rootellect Full-Stack Developer Intern technical review. Disallows search engine indexing via `<meta name="robots" content="noindex, nofollow" />`.

🚀 **Live Deployment URL:** [https://rootellect-puce.vercel.app/](https://rootellect-puce.vercel.app/)  
📂 **Source Code Repository:** [https://github.com/aditya-hariom/Rootellect.git](https://github.com/aditya-hariom/Rootellect.git)

---

## 1. Project Overview & Candidate Ownership

- **Applicant:** Aditya Kumar
- **Role:** Full-Stack Developer Intern
- **Live Demo:** [https://rootellect-puce.vercel.app/](https://rootellect-puce.vercel.app/)
- **Repository:** [https://github.com/aditya-hariom/Rootellect.git](https://github.com/aditya-hariom/Rootellect.git)
- **Tech Stack:** Next.js 16 (App Router, React 19, TypeScript), Tailwind CSS v4, Prisma ORM (SQLite / PostgreSQL compatible)
- **Automated Tests:** 10 Passing Tests across 3 Suites (`npm test`)

---

## 2. Functional Requirements Implementation Matrix (F1 – F7)

| Feature | Scope & Requirement | Implementation Details | Status |
| :--- | :--- | :--- | :---: |
| **F1: Homepage & Shared Navigation** | Desktop/mobile navigation, cart counter badge, assessment disclaimer banner, footer, on-page About, FAQ & Returns. | Implemented in `src/components/Navbar.tsx`, `AssessmentBanner.tsx`, and `Footer.tsx`. Visible notice on top. Accessible mobile hamburger drawer with zero horizontal overflow. | ✅ Pass |
| **F2: Product Catalogue** | 4 structured formulas, text search, category filtering, clear empty state. | Implemented in `src/components/CatalogueSection.tsx` & `ProductCard.tsx`. Products queried dynamically via Prisma Server Components. Search matches formula title, category, and benefits with instant no-results state. | ✅ Pass |
| **F3: Dynamic Product Detail Pages** | Dynamic slug `/products/[slug]`, 1/2/3 pack toggles, real-time savings updates, 404 handling. | Reusable template in `src/app/products/[slug]/page.tsx` & `ProductDetailClient.tsx`. Dynamic calculations for 1 bottle (₹799), 2 bottles (₹1,499, save ₹99), and 3 bottles (₹2,099, save ₹298). Unknown slugs trigger custom `not-found.tsx`. | ✅ Pass |
| **F4: Duo Bundles** | Mind Calm + 1 of 3 partner formulas = **₹1,399** (₹199 savings vs ₹1,598 separate purchase). | Dedicated route `/bundles` and homepage section in `src/components/BundleSection.tsx`. Visual bottle pairing, dynamic savings tag, and identifiable composite bundle item added to cart. | ✅ Pass |
| **F5: Persistent Cart** | Distinct variants, quantity adjustments, `localStorage` persistence across refresh. | Custom React context in `src/context/CartContext.tsx` synchronized with `localStorage`. Preserves 2-pack variant integrity (quantity of 2 on a 2-bottle pack = 4 bottles total; never silently merged). | ✅ Pass |
| **F6: Guest Checkout & Simulated Order** | Prefilled fictional customer details, server-side trusted pricing, Prisma order persistence, dual simulation actions. | Implemented in `src/app/checkout/page.tsx` & `src/app/actions/checkout.ts`. **Zero Client Trust:** Server recalculates totals from DB. **Simulate Success** saves order with reference `ORD-2026-XXXX`. **Simulate Failure** alerts user while preserving cart. | ✅ Pass |
| **F7: Original Differentiator** | Transparent Supply-Value Calculator with daily cost & continuous cycle duration breakdown. | Custom interactive component in `src/components/SupplyValueCalculator.tsx`. Breaks down daily investment (₹26.63/day vs ₹23.32/day) and cycle timeline (30, 60, 90 days). | ✅ Pass |

---

## 3. Review Benchmark Verification

> **Assessment Brief Shared Benchmark (Page 3):**
> *"One Mind Calm two-bottle pack (₹1,499) plus one Women Balance + Mind Calm duo (₹1,399) must total ₹2,898. The basket contains three Mind Calm bottles and one Women Balance bottle. Shipping and additional charges are zero."*

- **Line 1:** Mind Calm (2-Bottle Pack) = **₹1,499** (2 bottles of Mind Calm)
- **Line 2:** Mind Calm + Women Balance Duo = **₹1,399** (1 bottle Mind Calm + 1 bottle Women Balance)
- **Subtotal & Grand Total:** **₹2,898**
- **Total Bottles:** **4 bottles total** (3 Mind Calm + 1 Women Balance)
- **Shipping:** **₹0 (FREE)**
- **Verification:** Automatically asserted and verified in `tests/pricing.test.ts` and `tests/order-flow.test.ts`.

---

## 4. F7 Feature Deep Dive: Transparent Supply-Value Calculator

### The User Problem
In wellness and botanical supplementation, customers frequently drop off at checkout because they struggle to justify bulk packs (2 or 3 bottles) versus a single bottle. They lack clarity on:
1. What the actual daily financial commitment is.
2. Why botanical adaptogens require 60 to 90 consecutive days to establish steady-state endocrine and cortisol equilibrium.

### The Engineering & Design Choice
Rather than using generic e-commerce scarcity timers or false discounts, we engineered the **Transparent Supply-Value Calculator** directly into the pack selection hierarchy:
- **1 Bottle (Trial / 30 Days):** ₹26.63 / day (Base price ₹799)
- **2 Bottles (Habit Formation / 60 Days):** ₹24.98 / day (Save ₹99)
- **3 Bottles (Full Clinical Reset / 90 Days):** ₹23.32 / day (Save ₹298 — Best Value)
- **Interactive Timeline Bar:** Visually communicates biological cycle coverage (30% vs 60% vs 100% full endocrine reset) and updates dynamically as the user toggles pack sizes.

---

## 5. Architectural Principles & Security Design

```text
[ Client Browser ]
        │  Submits ONLY: { items: [{ slug/partnerSlug, packType, quantity }], customerData }
        │  (Client-calculated total prices are strictly omitted / ignored)
        ▼
[ Server Action / Handler: checkout.ts ]
        │
        ├─► 1. Customer Input & Email Regex Validation
        ├─► 2. Positive Integer Quantity Validation (rejects floats, negatives, <=0)
        ├─► 3. Database Product Lookup (Prisma ORM)
        ├─► 4. Trusted Price Recalculation (DB basePrice, twoPrice, threePrice, bundle ₹1399)
        ├─► 5. Component Inventory Stock Check
        │
   [ Action Check ]
     ├── "FAILURE" ──► Artificial Latency -> Return Error Banner -> Cart Intact in LocalStorage
     └── "SUCCESS" ──► Generate ORD-2026-XXXX -> Prisma DB Transaction -> Return Snapshot -> Clear Cart
```

1. **Zero Client Trust:** The frontend never dictates the order price. The server action fetches trusted records directly from the Prisma database and computes all line totals and bottle counts server-side.
2. **Idempotency & Double-Click Guard:** Checkout submission buttons immediately disable and display a loading spinner upon initiation, preventing duplicate transactions.
3. **Resilient Failure Recovery:** When `Simulate Failure` is executed, no database records are created and the client cart remains untouched in `localStorage` so the customer can retry without friction.

---

## 6. Automated Test Suite Evidence

Run the test suite locally:
```bash
npm test
```

### Actual Execution Output:
```text
> rootellect-assessment@0.1.0 test
> tsx --test tests/pricing.test.ts tests/server-validation.test.ts tests/order-flow.test.ts

▶ Check 1: Pack & Bundle Pricing Calculation Verification
  ✔ correctly calculates single formula pack discounts and savings (1.11ms)
  ✔ correctly calculates Duo Bundle savings vs separate purchase (0.31ms)
  ✔ PASSES SHARED REVIEW BENCHMARK: 1x Mind Calm 2-pack + 1x Duo Bundle = ₹2,898 and 4 bottles (0.20ms)
  ✔ enforces Quantity Rule: quantity of 2 on a 2-bottle pack = 4 bottles (0.21ms)
✔ Check 1: Pack & Bundle Pricing Calculation Verification (3.60ms)

▶ Check 2: Server-Side Validation & Tamper Rejection
  ✔ rejects negative quantities with clear error (30.74ms)
  ✔ rejects non-integer / floating-point quantities (2.50ms)
  ✔ rejects unknown or tampered product identifiers (1.38ms)
  ✔ rejects an empty checkout items array (0.30ms)
  ✔ handles intentional SIMULATE FAILURE action without creating order in DB (818.30ms)
✔ Check 2: Server-Side Validation & Tamper Rejection (857.07ms)

▶ Check 3: End-to-End Order Flow & Database Persistence
  ✔ processes shared benchmark items, calculates trusted totals, and persists order snapshot in DB (33.32ms)
✔ Check 3: End-to-End Order Flow & Database Persistence (38.04ms)

ℹ tests 10 | suites 3 | pass 10 | fail 0 | duration_ms 1132
```

### Manual Checklist & QA Verification
- [x] **Mobile Responsiveness (~375px):** Verified on mobile viewports. Zero horizontal scrollbar, touch-friendly touch targets (min 44px), sticky navigation with collapsible menu.
- [x] **Cart Refresh Persistence:** Added 2-pack Mind Calm + Duo Bundle, reloaded browser (`F5`). Cart state, items, quantities, and navbar badge counter remained 100% persistent.
- [x] **Checkout Failure & Retry:** Triggered `Simulate Failure`. Error feedback appeared; cart retained items. Subsequently clicked `Simulate Success` without re-adding items; order was successfully created.
- [x] **Keyboard Navigation & A11y:** Tested Tab navigation across all buttons, inputs, tabs, and modals with visible `:focus-visible` focus rings.

---

## 7. Local Setup & Reproduction

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm (v9+)

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/aditya-hariom/Rootellect.git
cd Rootellect

# 2. Install dependencies
npm install

# 3. Synchronize database schema (SQLite zero-config local file: dev.db)
npx prisma db push

# 4. Seed the 4 fixed assessment catalogue products
npm run db:seed

# 5. Run the automated test suite (all 10 tests pass)
npm test

# 6. Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 8. AI Usage Disclosure (As Required by Assessment Policy)

In compliance with the candidate brief's AI guidelines (Page 4):

| Dimension | Candidate Ownership vs. AI Assistance |
| :--- | :--- |
| **Visual Decisions & Design** | **100% Candidate-Led:** Color palette (Deep Forest Green `#1E3A2F`, Sage `#8FA382`, Sand `#FBF9F5`), typography selection, wireframes, and component layout recorded in `design-direction.md` prior to code generation. |
| **Product Photography & Assets** | Generated bespoke studio product photography using AI image tools based on manual creative direction (amber/forest glass, travertine pedestal, cream labels). |
| **Code Implementation** | **Assisted:** Used AI coding assistant for Next.js scaffolding, drafting repetitive Prisma CRUD queries, and formulating test assertions. |
| **Verification & Quality Control** | **100% Candidate-Led:** Every calculation, server validation edge case, and automated test was reviewed, executed locally (`npm test`), and verified via browser end-to-end sessions. |

### Representative Prompts Used
1. *"Create a Prisma schema with SQLite for Product, Order, and OrderItem snapshots with quantity and unit price."*
2. *"Write a server action in Next.js App Router that validates positive integer quantities, ignores client-submitted prices, and calculates order totals from database fixtures."*
3. *"Draft automated tests using node:test and node:assert verifying 1 Mind Calm 2-pack + 1 Duo Bundle equals ₹2,898 across 4 bottles."*

---

## 9. Deliberate Out-of-Scope Boundaries
To strictly respect the 12-hour effort cap and assessment instructions:
- **No live payment gateways (Razorpay/Stripe):** Replaced with realistic server-side `Simulate Success` and `Simulate Failure` actions.
- **No external email/SMS providers:** Order confirmation reference is surfaced directly in the persisted confirmation screen.
- **No CMS or administrative portal:** Seed scripts and Prisma Studio (`npm run db:studio`) are utilized for data management.