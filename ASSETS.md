# Vanforces asset inventory and placement

Originals stay in `assets/`, which is not published with the website. Only cleaned copies in `public/` are served.

Screenshots are cleaned by `scripts/sanitize-screenshots.mjs`, which covers names, emails, phone numbers, financial figures and internal labels with solid shapes, and crops status bars and taskbars. To update a screenshot, replace it in `assets/` and run `node scripts/sanitize-screenshots.mjs`. Check the result by eye, because mask positions are set per file.

## Logos

| Source | Used as | Where |
|---|---|---|
| `vf logo.svg` | `public/brand/vanforces-logo.svg` | Header, footer, mobile menu |
| `vf logo.svg` (pin and capsule mark only) | `src/app/icon.svg` | Browser tab icon |
| `vf logo@4x.png` | Not used | The SVG is sharper and transparent |
| `entaura.ai logo.svg` | `public/brand/entaura-logo.svg` | Homepage Entaura banner |
| `entaura.ai logo.png` | Not used | The SVG is sharper |

## Web screenshots

| Source | Published as | Shows | Used on |
|---|---|---|---|
| `Screenshot 2026-10-19 121946.png` | `cxo-finance.png` | The actual CXO dashboard (Finance Command Center) | Homepage hero and Section 04, Business Command Center, Collections, Finance Teams, Platform |
| `Screenshot 2026-10-19 121955.png` | `cxo-trends.png` | Trends and Transaction Outlook, with values masked | Business Intelligence, Business Command Center, Collections, Finance Teams, homepage tabs |
| `Screenshot 2026-11-04 142021.png` | `admin-home.png` | Admin dashboard | Control Room, Delivery, Managers, Platform, Book a Demo, homepage tabs |
| `Screenshot 2026-11-04 142052.png` | `company-settings.png` | Company Settings | IT & ERP, Deployment |
| `Screenshot 2026-11-04 142105.png` | `product-list.png` | Product list | Orders, Inventory, Van Sales, Wholesale, Industries, Meridian story, homepage tabs |
| `Screenshot 2026-11-04 142128.png` | `route-visit.png` | Route Customer Visit report | Routes, homepage tabs |
| `Screenshot 2026-11-04 142111.png` | `distributor-list.png` | Distributors list | Prepared, not currently placed |
| `Screenshot 2026-11-04 142117.png` | `user-list.png` | Users list | Prepared, not currently placed |
| `Screenshot 2026-10-19 122011.png` | Not published | Web login, shows a username and email | The login page is rebuilt instead |
| `Screenshot 2026-11-04 142038.png` | Not published | Entaura chat | Not used, because the assistant replies "not enough information" |

## Mobile screenshots

| Source | Published as | Shows | Used on |
|---|---|---|---|
| `Screenshot_20261019-122842.png` | `m-dashboard.png` | Dashboard | Homepage hero, Field Sales, Collections, Offline, Field Teams, FMCG, DSD |
| `Screenshot_20261019-123035.png` | `m-transactions.png` | Load, Unload, Settlement, Delivery Run menu | Van Sales, Inventory, Delivery, Field Sales, Food & Beverage, DSD |
| `Screenshot_20261019-123050.png` | `m-route.png` | Route Journey Plan | Homepage hero, Routes, Field Sales, FMCG, Northline story |
| `Screenshot_20261019-123507.png` | `m-sync.png` | Data export progress | Offline, Van Sales, Food & Beverage, Freshway story |
| `Screenshot_20261019-123543.png` | `m-login.png` | App sign-in | Login page |
| `Screenshot_20261019-123559.png` | `m-splash.png` | Splash screen | About |
| `Screenshot_20261019-123115.png` | `m-profile.png` | Salesman profile | Prepared, not currently placed |

## Illustrations (mascots)

All mascots are in use. To swap the mascot on a module, role, industry, guide or story page, change its name in the `mascots` list in `src/data/media.ts`.

| Source | Published as (`public/art/`) | Shows | Main places |
|---|---|---|---|
| `mascot 1.png` | `step-security.png` | Padlock and key | Collections, Offline, Privacy, Terms, Get Started |
| `mascot 2.png` | `step-company.png` | Gear and office | Solutions, Integrations, Deployment, IT & ERP, homepage integrations |
| `mascot 3.png` | `step-location.png` | Map and pin | Homepage, Routes, Field Sales, Platform, DSD, 404 |
| `mascot 4.png` | `step-review.png` | Phone and tax document | ROI, Orders, Collections, Finance, homepage tabs |
| `mascot 5.png` | `step-business.png` | Magnifier with icons | Homepage, Field Sales, Use Cases, FMCG, Platform |
| `mascot 6.png` | `step-operations.png` | Clipboard, van, route pins | Homepage hero, Van Sales, Delivery, Wholesale |
| `mascot 7.png` | `van-plain.png` | Mascot 6 with white patches | Delivery example only, because it needs a white background |
| `mascot 8.png` | `supply-chain.png` | Factory to warehouse to shop | Industries, Inventory, Food & Beverage, Platform, homepage |
| `mascot 9.png` | `signpost.png` | Signpost | All Modules, closing bands, Get Started |
| `mascot 10.png` | `step-confirm.png` | Checklist and thumbs up | Book a Demo, Control Room, Managers, homepage |
| `mascot 11.png` | `inspector.png` | Inspector with icons | Resources, Command Center, Intelligence, Customers module |
| `mascot 12.png` | `pointer.png` | Signpost, second pose | Closing bands on product pages |
| `mascot 13.png` | `pricing.png` | Price tag | Pricing, homepage pricing |
| `mascot 14.png` | `partners.png` | Two mascots | Partners, Customers, homepage partnership card |
| `02_set_up_your_company.png` | `setup.png` | Mascot in glasses with buildings | Get Started |
| `doll.svg` | `mascot-wave.png` | Mascot waving | Homepage final call to action |
| `about-us.svg` | `about.svg` | Truck, shop, mascot | About |
| `contact-banner-top.svg` | `contact.svg` | Two mascots with a form | Contact |
| `faq (2).svg` | `faq.svg` | Mascot and question mark | FAQ |

## Missing product screens

No real screen was supplied for these, so the site uses related real screens or labelled diagrams, never invented interfaces:

- Customer master and customer detail (Customers page uses a labelled workflow illustration)
- Order or invoice creation (Orders page uses the product list)
- Delivery workflow (Delivery page uses the admin dashboard and transaction menu)
- Outstanding invoices, receipts and collection entry (Collections page uses the Command Center and mobile dashboard)
- Warehouse, load and unload detail (Inventory page uses the product list and transaction menu)
- SpeakOrder (labelled concept illustration)
