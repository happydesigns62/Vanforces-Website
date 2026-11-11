# Vanforces AI-First Website Revamp: Plan for Approval

**Status:** Proposal written 2026-11-11 after the owner's meeting with the lead. **Nothing in this document is approved yet.** It sits on top of [design-direction.md](design-direction.md) and [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) and does not replace them. Earlier approved decisions stay in force unless this document says otherwise and the owner approves.

**Out of scope for this phase:** the Connected Distribution Journey (`JourneyRail`, its stages, order and illustrations). It stays exactly as it is and is fixed in a later phase.

---

## Approved decisions (owner, 2026-11-11)

These answer the questions raised in the first version of this plan. They override anything below that says otherwise.

1. **Hero gradient.** Vint-style soft flowing ribbon. The flowing movement is the priority. Grain is optional and must be almost invisible. If it hurts smoothness, performance or appearance, remove it. Colours: Vanforces teal, turquoise and cyan, with at most a very subtle peach accent. Existing hero illustrations, mascot and product screenshots are preserved. The canvas prototype is an acceptable starting point. The final visual still needs review and approval before it counts as done.
2. **Headline.** "Connected Distribution. Made Smarter with AI." The supporting description explains how Vanforces connects field sales, routes, stock, orders, deliveries, collections and business intelligence. **Entaura is not mentioned prominently in the hero subtitle.** Never suggest Entaura is included in every Vanforces subscription.
3. **Removed from the homepage:** the sample numbers band and the AI-generated field photos. The original image files are **not** deleted. Real product screenshots, dashboards and original mascot illustrations are used instead.
4. **Entaura and Whatasol:** wording and capability lists as supplied by the owner (see "Approved product wording" below). Whatasol is presented as a related communication solution, not as a confirmed live Vanforces integration. Entaura is more prominent than before but visually compact, with Ask, Insight and Watch as the main interactive areas.
5. **ZATCA, Odoo, Zoho Books:** qualified wording only. No unconditional Phase 2 compliance claim. No "fully production-ready" claim for Odoo or Zoho. Credit notes and sales returns are not presented as completed.
6. **Competitor.** BeatRoute is the confirmed competitor. A factual, neutral Vanforces vs BeatRoute feature comparison, not written to flatter Vanforces. Compact preview on the homepage, full table on a separate page.
7. **Homepage arrangement.** Approved content strategy: Requirement Assistant inside Explore, one compact ecosystem section (Odoo, Zoho Books, Whatasol, ZATCA), a more meaningful but concise Entaura showcase, Business Value combined with the competitor preview where it helps, no long standalone sections. Length stays about the same or slightly shorter.
8. **Connected Distribution Journey** stays unchanged in this phase.

**Next design task:** the Vint-inspired flowing gradient hero with existing illustrations preserved. Hero code is not changed further until the owner approves the proposal below.

### Approved product wording (qualified, not a confirmation of live status)

| Item | Short website copy | Capability points to draw from |
|---|---|---|
| Whatasol | **Smarter Business Conversations.** Organize customer conversations, manage team communication and streamline WhatsApp engagement through shared inboxes, automation and campaigns. | Shared team inbox, centralised WhatsApp conversations, assignment and management, message templates, campaigns, automated responses and workflows, customer engagement, communication analytics, APIs and supported integrations |
| Entaura | **Intelligence for Better Business Decisions.** Ask questions, explore business knowledge, discover insights and monitor important changes with Entaura. | **Ask:** natural-language questions, authorised knowledge retrieval, source-backed answers. **Insight:** analysis, performance comparisons, trends, charts and explanations. **Watch:** configured monitoring, scheduled summaries, alerts. **Agentic:** authorised multi-step workflows, connected tools, data sources and business applications |
| ZATCA | **Saudi E-Invoicing Support.** Support applicable Saudi e-invoicing requirements through configured invoice processing, validation and integration workflows. | Electronic invoice processing, validation, XML and QR handling, required identifiers, supported Fatoora workflows, submission and error handling, Al Mawasil-related work |
| Odoo | **Odoo Integration.** Connect supported Odoo business records with Vanforces distribution workflows through configured data synchronization. | Customers, products, units and packaging, sales orders, invoices, collection receipts, mappings, queues, retry and duplicate handling, configured bidirectional sync |
| Zoho Books | **Zoho Books Integration.** Connect supported customer, product, invoice and payment information between Vanforces and Zoho Books. | Customers and contacts, items, invoices, customer payments, mappings, queues, sync monitoring, retry and duplicate handling |

Wording rules: use "supported", "configured" and "applicable". Do not use "certified", "fully compliant", "fully integrated", "production-ready" or "all Entaura features". Entaura is always described as a separate platform. Whatasol is "related", not "integrated", until verified.

### Competitor comparison rules (Vanforces vs BeatRoute)

- **Status values:** Available | Limited / Configured | In Development | Not Available | Not Verified. "Not Verified" is never shown or treated as "Not Available".
- **Areas:** Field Sales, Route and Visit Management, Van Sales, Inventory Management, Orders and Invoices, Collections, Offline Operations, Dashboards and Analytics, AI Assistants, AI Recommendations, Route Optimization, ERP Integrations, WhatsApp Communication, Saudi E-Invoicing.
- **The page should show:** features both have, features only Vanforces has (if confirmed), features only BeatRoute has (if confirmed), limited or configuration-dependent features, features in development, features not verified, features confirmed unavailable.
- **Evidence rule:** every BeatRoute cell needs a current official source (their site, docs or published pages) and a "checked on" date. Anything I cannot find stays "Not Verified". Every Vanforces cell is marked by the Vanforces team, not by me.
- **No claim of unique AI.** BeatRoute publishes several AI agents, so AI is a comparison row, not a Vanforces advantage.
- **Neutral tone.** No adjectives that favour either product. A short "How to read this" note and the check date sit above the table.
- A Vanforces-side status sheet must be filled in by the team before the comparison is built (see the verification list).

### Technical verification list (for the development team)

Kept separate on purpose. The design continues with qualified wording while these are confirmed.

| # | Item to confirm | Why it matters |
|---|---|---|
| 1 | Entaura: current state of the Vanforces and Entaura ticket-based integration, and which business-data actions exist in production | Decides whether the showcase can say "connected" or only "can complement" |
| 2 | Entaura: whether a Vanforces-specific example question can be shown, and whether real (sample-labelled) screenshots may be used | Controls the demo content |
| 3 | Whatasol: is any Vanforces to Whatasol sync live, or planned | Decides "related solution" vs "integrated" |
| 4 | ZATCA: which phase is supported and what is validated in production, plus Al Mawasil's exact role and whether it may be named | Controls how the Saudi e-invoicing card is worded |
| 5 | Odoo: which modules are implemented and tested, which still need work, and the sync direction for each | Controls the status chip (Available, Configured, In development) |
| 6 | Zoho Books: same breakdown. Credit notes and sales returns stay unlisted until confirmed | As above |
| 7 | Vanforces status for every comparison row (the 14 areas above) | The comparison cannot be built without it |
| 8 | Logo permissions for Odoo, Zoho, Whatasol, ZATCA, Entaura and BeatRoute | Only use logos that are permitted and accurate |
| 9 | Confirm the sentence "Entaura is a separate platform and not included in every Vanforces subscription" is acceptable to display | Matches the existing pricing FAQ |

---

## A. Understanding

The lead wants Vanforces to read as an intelligent, automation-minded distribution platform, not a common SaaS site. Concretely:

1. A flowing, Vint-style gradient behind the hero, in Vanforces colours, with the existing illustrations untouched.
2. A hero headline that says "AI" clearly and without overclaiming.
3. A way for visitors to describe their business and be pointed to the right capabilities.
4. A stronger showcase for Entaura.
5. Whatasol, ZATCA, Odoo and Zoho shown as one connected ecosystem.
6. A credible, evidence-based comparison with a real competitor (BeatRoute).
7. **The homepage must not get longer.** New content has to replace or merge with existing content.

Constraints carried over: real screenshots only, no invented customers, figures or capabilities, mascots not regenerated, Journey untouched, no Figma changes yet, no deploy without approval.

## B. Existing homepage assessment

Reviewed from the local project (`src/app/page.tsx` and `src/components/home/`). I have not compared against the deployed URL, so the live site may be slightly older.

Current order: Hero, Explore, Journey, Numbers band, Pricing selector, Command Center (with a slim Entaura card), Stories, Business Value, ERP & Integrations, Field photos, Closing panel. Eleven blocks.

**Strong, keep:**
- Hero van-sales illustration, mascot and real dashboards (the brand's best asset).
- The vignette illustration system used across sections.
- Command Center dark panel, the page's one dark moment.
- Colour tokens, type scale, button style, motion rules.

**Weak or repetitive:**
- **Numbers band:** sample figures with no real data. It adds height and little trust.
- **Field photos:** AI-generated, marked illustrative. They compete with the real illustration style and the real screenshots. (Already shown on the Platform page.)
- **Business Value and ERP & Integrations:** both explain "what you get" and overlap with the new Ecosystem and Differentiation content.
- **Repeated CTA rows:** Explore, Journey and the closing panel each end with their own button row.
- **Same heading rhythm everywhere:** pill label, two-tone title, short paragraph. Reads as automated after five repeats.
- **Entaura is too small** for what the lead wants: a slim card inside another section.

**Needs stronger storytelling:** the "AI-enhanced" idea (nothing in the page says it today), the Entaura story, and the integrations (currently a diagram, no distinction between ERP, messaging and compliance).

**Moves to inner pages:** field photos (Platform only), long integration detail (Integrations pages), the full competitor comparison (new `/compare` page).

## C. Vint animation analysis

**Method and honesty:** I looked at the three recordings through a few still frames each, plus your later screenshots, because I cannot play video continuously. Frame-by-frame I can judge shape, position and colour, not the exact easing curves. Treat my timing as an estimate to tune in the browser.

**What the reference does**
- **Shape:** one broad ribbon of colour, 15 to 25% of the screen thick, with an organic S-curve rather than a straight stripe. One edge fades softly into white. The other edge is slightly denser.
- **Texture:** the soft edge is not a plain blur. It breaks into very fine grain (dither), which gives it the "printed" feel. This is the signature of the effect.
- **Position:** the ribbon enters from outside the frame (a corner or an edge) and crosses on a diagonal. In your screenshots it appears in three poses: sweeping in from the top-left, rising from the bottom-right, and arching from the lower-left to the upper-right.
- **Travel:** the whole field drifts, and the curve bends and its thickness changes as it moves. It looks like one large flowing sheet, not separate objects.
- **Colour into white:** a single hue, slightly deeper at the core and lighter toward the edges, dissolving into the white page with no hard line.
- **Loop:** continuous and slow, with no visible reset. White negative space changes as it moves.

**Closest feasible version for Vanforces**
- A small `canvas` draws two soft ribbons (teal large, a warm peach/orange one smaller). Control points of each curve drift on slow, unrelated cycles, so the curve bends and the width changes. A fixed noise pattern keeps or drops each pixel to produce the fine grain at the edges.
- Colours come from the existing tokens: teal `#0E7F86`, teal `#1CB2BB`, cyan tints, and the brand orange only as a small partner ribbon.
- **Why canvas and not pure CSS:** a CSS gradient can slide and fade but cannot bend into a changing curve or produce the grain. A CSS version would look like a moving stripe, which is what you rejected the first time.
- **Performance:** low internal resolution, about 30 frames a second, pauses off screen and when the tab is hidden, one still frame for reduced motion. No new library.

**Protecting the illustrations:** the canvas sits behind the content layer (`z-0`, `pointer-events-none`), fades out toward the bottom of the hero, and the van scene, dashboard and text sit above it unchanged.

**Current state (please note):** I already built a first prototype of this (`src/components/home/HeroFlow.tsx`, used in `HomeHero.tsx`) before this brief arrived. It is a prototype for review, **not approved**. Known weaknesses: the grain is a little coarse, the ribbon can pass behind the grey subtext, and I only compared stills. **Decision (2026-11-11): flowing movement first, grain almost invisible or removed.** The next step is to soften the grain, lower the peach ribbon to a subtle accent, keep the ribbon away from the subtext, then review in the browser.

## D. Hero design recommendations

**Headline options** (claim risk matters because Entaura is currently described on this site as separate and not in any plan):

| # | Headline | Claim risk |
|---|---|---|
| 1 | Connected Distribution. Made Smarter with AI. | Low. Does not say the whole product is AI. **SELECTED by the owner, 2026-11-11** |
| 2 | Connect Your Sales & Distribution. Add AI Where It Matters. | Low. Honest about scope |
| 3 | Run Your Distribution Smarter with AI. | Medium. Reads as the whole platform being AI-run |
| 4 | Connect Your Sales & Distribution. Power It with AI. | Medium. "Power" implies AI is core to Vanforces |
| 5 | Connected Distribution. Intelligent Operations. | Low. No "AI" word, so weaker for the lead's goal |

**Supporting line (one line, per the approved hero rules), no Entaura mention (owner decision):** proposed wording: "Vanforces connects field sales, routes, stock, orders, deliveries, collections and business intelligence in one operation." Needs owner approval of the exact words before it goes in.

**CTAs:** primary **Book a Demo** (the real conversion), secondary **See how it fits your business** (jumps to the new Solution Finder). "Explore Plans & Pricing" moves to the Pricing section and the header. Fewer competing buttons.

**Small refinements, to be agreed before building:**
- Chip above the headline: keep "Connected Distribution Operations Platform" and add a small "AI-assisted" marker only if the claim is confirmed.
- Move the customer logo strip higher (directly under the dashboard) to shorten the hero.
- Illustrations, mascot and dashboards stay.

## E. Revised homepage structure

| # | Today | Proposed | What happens |
|---|---|---|---|
| 1 | Hero | **Hero** | Stays. New ribbon, new headline, new CTAs, logos higher |
| 2 | Explore | **Explore + Solution Finder** | Merges. The five-area list stays, with a "Describe your business" box on top (see F1) |
| 3 | Journey | **Journey** | **Unchanged** |
| 4 | Numbers band | removed | Sample numbers go. Nothing replaces them. Tell me if you want them kept |
| 5 | Pricing selector | **Pricing selector** | Stays where you placed it |
| 6 | Command Center + slim Entaura | **Intelligence cluster** | Command Center stays dark. Entaura becomes a proper showcase directly below it (see F2) |
| 7 | Stories | **Stories** | Stays, sample labels stay |
| 8 | Business Value + ERP & Integrations | **Ecosystem** and **Why Vanforces** | Integrations hub becomes the tabbed Ecosystem (F3). Business Value merges with the comparison preview into one tabbed "Why Vanforces" (F4) |
| 9 | Field photos | moved | Stays on the Platform page only |
| 10 | Closing panel | **Closing panel** | Stays |

**Interactive:** the Solution Finder, the Entaura tabs, the Ecosystem tabs and the Why Vanforces tabs. **Separate inner pages:** `/compare` (competitor detail), the existing integration pages (Odoo, Zoho Books), and new short pages for Whatasol and ZATCA only if you want them.

**Length estimate:** about the same to slightly shorter. Removed: Numbers band, Field photos. Merged: Business Value into Why Vanforces, the Integrations hub into the Ecosystem tabs. Added: a compact Entaura showcase. Roughly 10 blocks instead of 11. I will measure the real page height before and after in the browser and report it, rather than rely on this estimate.

## F. New component ideas

**F1. Requirement assistant, "Solution Finder" (recommended: Option C, hybrid, built in two stages)**
- **Stage 1:** embedded at the top of Explore. A text box with four example chips ("25 reps, many routes, stock and collections are hard to track"). Pressing Find shows three to five matched capability cards (module name, one line on why it fits their words, link to its page) and a Book a Demo button. Little extra height, because it shares the Explore section and highlights the same capability list.
- **Honest labelling:** it is rule-based, so the label is "Guided recommendations", never "AI". Matches come from a verified keyword-to-module map kept in `src/data`.
- **Privacy:** the typed text is not put in the URL, not stored and not sent anywhere in Stage 1.
- **Stage 2 (optional, later):** a small floating launcher that opens the same finder as a chat panel. A genuinely generative assistant needs a backend, an approved product knowledge source, usage limits and a key. I recommend deciding that separately.
- **Visual:** a soft cyan panel, a prompt field with a teal send button, result chips with the existing icons or vignettes. No fake typing that pretends to be a live model.

**F2. Entaura intelligence (compact bento beneath the Command Center)**
- Headline idea: "Vanforces connects the operation. Entaura helps make sense of it."
- Left: a conversation preview with one example question ("Which sales routes are falling behind their targets this week?"), then four short steps shown as chips: understand, retrieve authorised data, analyse, answer with the supporting figures.
- Right: three tabs, **Ask**, **Insight**, **Watch** (the names Entaura uses). Each shows a short line and a screenshot.
- Uses real Entaura screenshots. Entaura's own demo uses a fictional company (Nuvora), so any screenshot must be labelled as sample data. No invented UI.
- One link out to entaura.ai. A clear note that Entaura is a separate platform.

**F3. Ecosystem (one tabbed panel replacing the hub)**
- Three tabs: **ERP & Accounting** (Odoo, Zoho Books), **Business Communication** (Whatasol), **E-Invoicing & Compliance** (ZATCA).
- Each tab: logo(s), a three-line list of what is supported today, a status chip (Available, Configured per project, In development), and one link to a detail page.
- The existing centre-hub drawing is kept as the visual on the left of the panel, with the active tab's partner highlighted. Same height as today.

**F4. Why Vanforces and comparison preview**
- Two tabs: **Business value** (the current three editorial rows) and **How we compare**.
- "How we compare" shows four verified differentiators and a five-row comparison preview with three states for every cell: Confirmed, Not stated, Not confirmed. A link goes to `/compare` for the full view.
- No competitor weakness is claimed unless the competitor's own pages state it.

## G. Product accuracy review

Sources: entaura.ai and beatroute.io (fetched 2026-11-11), the project's own data files, and public ZATCA information. **I could not verify anything about Vanforces' own integrations from outside the team. Those rows need you or the product team.**

| Topic | Status | Evidence | Needed before publishing |
|---|---|---|---|
| Entaura: Ask, Insight, Watch | Confirmed on entaura.ai | Ask answers from documents and records with citations. Insight gives plain-language analytics with charts. Watch sends scheduled or threshold alerts via WhatsApp or Telegram | Owner to confirm wording |
| Entaura: read-only access, role-based access, audit logging, multilingual questions, "600+ connectors" | Stated on entaura.ai | Vendor claims on its own page | Use wording close to theirs, do not amplify "600+" without confirmation |
| Entaura: "Powered by Texol" | Stated on entaura.ai | Appears in its heading | Confirm how it may be mentioned |
| Entaura works with Vanforces data | **Unverified** | Vanforces appears only as a logo on entaura.ai | Product team: what is live, what is a configured integration, what is planned |
| Entaura "integration APIs" | **Unverified** | The page says "Your apps (API)" with no documentation | Confirm |
| Entaura in Vanforces plans | Currently **not included** | Existing site FAQ says it is a separate platform | Keep that wording unless the lead changes it |
| Whatasol | **Unverified** | I found no public information on a product by this name. It appears only as a logo on entaura.ai | Owner: product description, what it does with Vanforces, logo permission |
| ZATCA Phase 2 (Fatoora) | Public fact | ZATCA runs clearance for B2B and reporting for B2C. Rollout is by waves | Vanforces: which phase is supported, what is implemented, any certification |
| Al Mawasil | Public: a third-party provider that connects e-invoicing software to Fatoora | Its own site | Vanforces: its exact role, and whether it can be named |
| Odoo | Existing site page says scope is agreed per project and not every model is supported | `src/data/integrations.ts` | Which modules and sync directions are live. Production-ready or pilot |
| Zoho Books | Existing site page says confirm scope with the team | `src/data/integrations.ts` | Implemented records and directions |
| BeatRoute facts | Stated on beatroute.io | SFA, DMS, retailer app, route optimisation, van sales automation, AI agents (TeleOrder, Scheduling, Order, Copilot), SAP integration, SOC and ISO certifications, 200+ brands in 20+ countries | Re-check before launch, because their site changes |
| BeatRoute: collections, ERP beyond SAP, regional e-invoicing, offline, deployment model | **Not stated on the homepage** | Absent from the page | Record as "not stated", never "not available". Check their other pages and docs |
| BeatRoute AI | **Exists** | Several named AI agents | Vanforces cannot claim AI as a differentiator against BeatRoute without evidence |
| Differentiators for Vanforces (offline, collections, settlements, regional e-invoicing, Odoo/Zoho) | Partly confirmed on the site for offline, collections and settlements | `src/data/modules.ts` | ZATCA, Odoo and Zoho depth must come from the team before they are used as differentiators |

## H. Implementation roadmap

1. **Approve** this structure and direction (you).
2. **Approve** the headline, supporting line and ribbon style.
3. Implement **only** the hero ribbon and the approved hero refinements.
4. Review live in the browser, desktop and phone.
5. Refine until it matches.
6. Approve the compact components one by one: Solution Finder, Entaura, Ecosystem, Why Vanforces.
7. Build them, replacing or merging sections so the page does not grow.
8. Test 375, 768, 1280 and 1440 widths, interactions, reduced motion and performance. Measure page height before and after.
9. Fill the claim checklist with the team, then finalise wording.
10. Figma and frontend handoff (Figma only after your go-ahead and permissions check).

## Open questions

All eight first-round questions are answered (see Approved decisions). What remains is technical verification (list above) and these implementation choices, none of which blocks the hero:

1. Approve the exact hero supporting sentence (proposal in section D).
2. Approve the refined ribbon after seeing it in the browser.
3. Whether the full comparison lives at `/compare` (recommended) or inside an existing page.

## Housekeeping notes

- `design-direction.md` says BeatRoute is not a design reference. That stays true. BeatRoute is now studied as a **competitor** only.
- The `vanforces-design-director` skill still names BeatRoute as a reference and uses Title Case wording from earlier. Not edited. Needs your decision.
