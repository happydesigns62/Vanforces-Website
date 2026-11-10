# Homepage asset sheet

**Status:** Collecting assets. No homepage design has been started.
**Design rules:** [design-direction.md](../design-direction.md)
**New files go in:** `assets/pages/home/`

## Status meanings

- **Supplied:** the file is in `assets/pages/home/`
- **Reviewed:** checked for sharpness, size and private details
- **Masked:** a privacy-safe copy exists in `public/` (screenshots only)
- **Approved:** the owner has confirmed where it is used

## Homepage sections

These are the sections in the current homepage prototype (`src/app/page.tsx`). The owner confirms the final planned structure before design starts.

1. Hero
2. Customer proof
3. Product explorer (tabs by team)
4. Connected journey
5. Business Command Center
6. Entaura banner
7. Customer stories
8. Value (time, control, clarity)
9. Integrations and partners
10. Pricing and closing call to action

## New assets for the homepage

| File | What it shows | Section | Supplied | Reviewed | Masked | Approved |
|---|---|---|---|---|---|---|
| `screens-web/hero-dashboard.png.png` | Main dashboard with demo figures | Hero, screen 1 | Yes | Yes | Preview made (DEV badge and user name hidden) | Awaiting approval |
| `screens-web/hero-cxo-command-center.png.png` | Finance Command Center with funnel and KPI cards | Hero, screen 2 | Yes | Yes | Preview made (company label hidden) | Awaiting approval |
| `screens-web/hero-route-visit.png.png` | Route Customer Visit | Hero, screen 3 | Yes | Yes | **Not used yet.** Still the old version with a real customer name and red "Not visited" rows. Needs a new capture | Waiting |
| `logos/logo-agc.png.png` | AGC Car Accessories logo, on a maroon background | Trusted-by row | Yes | Yes | No | Owner confirmed permission. Transparent version would look better |
| `logos/logo-chefhouse.png.png` | Chefouse logo, on a light-gray background | Trusted-by row | Yes | Yes | No | Owner confirmed permission. Transparent version would look better |
| `logos/logo-kaku.png.png` | KAKU logo | Trusted-by row | Yes | Yes | No | Owner confirmed permission. Low resolution, higher-res version wanted |
| `logos/logo-maximus.png.png` | Maximus logo | Trusted-by row | Yes | Yes | No | Owner confirmed permission |
| `logos/logo-punathil.png.png` | Punathil Egg Traders logo (tall shape) | Trusted-by row | Yes | Yes | No | Owner confirmed permission |
| `logos/logo-QTerminals.png.png` | QTerminals logo (wide shape) | Trusted-by row | Yes | Yes | No | Owner confirmed permission |

Masked previews are in `assets/pages/home/masked-preview/`. They are made by `scripts/sanitize-home-hero.mjs` and are not published until approved. The double `.png.png` file endings are harmless.

## Existing assets that could be reused

These are already in the project. None is chosen for the new homepage yet.

| Asset | Shows | Notes |
|---|---|---|
| `public/product/cxo-finance.png` | CXO Finance Command Center | Shows SAR 0.00 and −100% values. A demo-data version would look better |
| `public/product/cxo-trends.png` | Sales and collection trends | Values masked |
| `public/product/admin-home.png` | Admin dashboard | |
| `public/product/route-visit.png` | Route Customer Visit report | |
| `public/product/m-dashboard.png` | Mobile dashboard | |
| `public/product/m-route.png` | Route Journey Plan, list view | |
| `public/product/m-transactions.png` | Load, unload, settlement menu | |
| `public/art/step-operations.png` | Mascot with clipboard, van and route pins | Currently the hero mascot |
| `public/art/pricing.png` | Mascot with price tag | Pricing section |
| `public/art/mascot-wave.png` | Mascot waving | Closing call to action |

## Still needed

- [ ] Figma file link, for the exact peach, gradients and font (goes in `assets/brand/` once exported)
- [ ] Decision: sentence case or Title Case for headings
- [ ] Decision: multicolor or teal-family feature icons
- [ ] Decision: mascot style where flat and newer styles differ
- [ ] Homepage mascot(s)
- [ ] Dashboard screenshots with demo data instead of zeros
- [ ] "Target Performance" dashboard and route-map phone screen (seen in the Features design, not yet in the project)
- [ ] Optional: reference images or a Hulio screen recording in `references/`
