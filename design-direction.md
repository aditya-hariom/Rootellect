# Design Direction & UX Blueprint

## 1. Visual Identity & Theme
- **Theme:** Minimal, modern wellness & holistic healthcare.
- **Color Palette:**
  - Primary (Brand): Deep Forest Green (`#1E3A2F`) — trust and natural wellness.
  - Secondary/Accent: Soft Sage (`#8FA382`) and Warm Sand (`#F4EFEB`) for backgrounds and cards.
  - Base Text: Charcoal Gray (`#1F2421`) for high readability.
  - Alert/Error: Muted Terracotta (`#C25943`).
- **Typography:**
  - Primary Font: Inter or Plus Jakarta Sans (clean sans-serif, high legibility across 375px to 1440px).

## 2. Product Detail Page (PDP) Layout Wireframe

### Mobile Layout (~375px)
+-----------------------------------+
| [Logo] Rootellect Demo     [Cart:2]|
+-----------------------------------+
| Product Image (Carousel/Sticky)   |
| [ Image Container: 1:1 ratio ]    |
+-----------------------------------+
| Category Tag: "Cognitive Health"  |
| Product Title: "Mind Calm"        |
| 30 capsules / ₹799 starting       |
+-----------------------------------+
| Pack Selector:                    |
| [ ( ) 1 Bottle - ₹799           ] |
| [ (*) 2 Bottles - ₹1,499 (Save) ] |
| [ ( ) 3 Bottles - ₹2,099 (Best) ] |
+-----------------------------------+
| Summary: ₹1,499 | Total: 2 Bottles|
| [  Add to Cart Button  ]          |
+-----------------------------------+
| Description & Dummy Benefits      |
+-----------------------------------+

### Desktop Layout (~1440px)
+-------------------------------------------------------------------+
| [Logo] Rootellect Demo       Home   Shop   Bundles   FAQ   [Cart:2]|
+-------------------------------------------------------------------+
| [ Left Column: 55% ]             | [ Right Column: 45% (Sticky) ] |
| Large High-Res Product Image     | Category & Title               |
| Thumbnails / Secondary Views     | Price & Bottle Count           |
|                                  | Pack Selector (1 / 2 / 3 Pack) |
| Ingredient Overview              | Savings Badge                  |
| Quality / Usage Notes            | [ Add to Cart ] CTA            |
| F7 Feature: Daily Supply Value   | Shipping Note: ₹0 (Demo)       |
+-------------------------------------------------------------------+

## 3. Shopping Interaction: Duo Bundle Flow
- Select Base Formula (Mind Calm - locked).
- Choose Pair Formula (Dropdown / Radio toggle between the 3 formulas).
- Dynamic Pricing Card:
  - Separate Price: ₹1,598
  - Bundle Price: ₹1,399
  - Discount Tag: "Save ₹199"
- Direct CTA: `Add Bundle to Cart`