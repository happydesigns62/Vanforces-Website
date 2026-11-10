# Vanforces Visual Direction

**Status:** Approved by the project owner on 2026-11-06.
**Purpose:** This document guides every future page design. Read it before designing or restyling any page, section or component.

Pages are not redesigned from this document automatically. Each page is planned, designed and approved one at a time (see "How we work").

---

## 1. The direction in one line

**"Qarin's calm precision, in Vanforces colors."**

- **UI/UX quality** comes from Qarin: generous equal spacing, few and consistent sizes, soft cards and clear hierarchy.
- **Personality** comes from Vanforces: teal gradients, peach and cyan glows, the mascots and the real product screenshots.
- **Motion** comes from Hulio: smooth, coordinated movement, added only after each static design is approved.

## 2. References and what each one is for

| Reference | Role | Use it for | Never take |
|---|---|---|---|
| Qarin, https://qarin.framer.website/ | **Primary UI/UX reference** | Composition, cards, typography, spacing, section backgrounds and transitions, product presentation | Its colors, logo, branding, photos, exact layouts or assets |
| Hulio, https://hulio.framer.website/ | **Motion reference** | Smooth scrolling, scroll reveals, transitions, hover effects, screenshot reveals | The whole animation system copied blindly |
| Vanforces Features and Pricing page designs | **Visual foundation** | Logo, palette, gradients, mascots, screenshot style, page character | Nothing to avoid. Preserve and refine |

BeatRoute is **not** a reference. The website's page list and section structure were already planned and stay as they are. Presentation can be refined, but any structural change needs the owner's approval.

## 3. Brand identity to preserve

From the existing **Pricing** page design:

- Deep-teal gradient plan-card headers with white pill buttons
- Teal-tinted card outlines
- Peach and cyan corner glow behind the hero
- Small pill section labels with a teal dot, for example "• Compare Plans"
- Light-cyan closing panel
- Teal-to-peach gradient "Get Started" button

From the existing **Features** page design:

- Centered hero with a mascot
- Large real dashboard screenshot
- Workflow line with connected steps
- Feature category grid with search
- Tabbed workflow section combining a phone screen and a mascot

Always:

- Vanforces logo, white-dominant backgrounds, the turquoise, teal and cyan palette
- Original mascot characters in their original style
- Real dashboard and mobile app screenshots only. No invented dashboards

## 4. How we reach Qarin-level quality

Qarin looks premium because it is **strict**: very few sizes, very few corner styles and the same spacing everywhere. These are measured values from Qarin and their Vanforces translations.

| Qarin principle (measured 2026-11-06) | Vanforces rule |
|---|---|
| About 130px of space above and below almost every section | 128px desktop and 72px phone, the same on every page |
| Sections alternate white and near-white gray bands. Each band holds one topic: heading plus content | Alternate white with Soft Cyan `#F0FAFB` or Light Gray `#F7F9FA`. One topic per band |
| Almost no borders. Cards use a faint tinted 1px outline and a very soft layered shadow | Faint teal-tinted outline (`cyan-line` `#CFEEF0`) plus `shadow-lift` |
| Mostly two corner sizes, 16px and 24px, with 8px for small items | Three sizes only: 12px small, 20px cards, 28px large panels |
| Headings at weight 500 with tight letter spacing. 64px hero, 48px section, 20–23px card | Headings at weight 600, same size steps |
| Body text 16px with about 1.7 line height, dark text, gray secondary text | 16px at 1.65 in navy `#293B47`, secondary text `#647580` |
| One idea per section: heading and short checklist beside one product visual | One message, one real screenshot, a mascot only where it adds meaning |
| Product visuals float on a soft color glow inside rounded panels | Real screenshots on the peach and cyan glow. Phones overlap desktop screens for depth |
| A single dark band for contrast | At most one navy or deep-teal gradient section per page |

## 5. Design system

These use the existing tokens in `src/app/globals.css`. Values marked **(confirm from Figma)** are still open.

| Area | Rule |
|---|---|
| Colors | Teal `#1CB2BB`, teal-deep `#0E7F86`, navy `#293B47`, navy-deep `#1E2C36`, cyan-soft `#F0FAFB`, cyan-line `#CFEEF0`, mist `#F7F9FA`, line `#E2E8EB`, muted `#647580`. Peach for glows and the gradient button **(confirm from Figma)** |
| Gradients | Only three: the peach and cyan hero glow, the deep-teal card gradient, and the teal-to-peach button (once per page). No purple, neon or heavy glows |
| Readability | `teal-deep` for small teal text. Never white text on plain teal |
| Font | Currently Manrope **(confirm from Figma)** |
| Text sizes | Nine steps: hero 64–72, page 56–64, section 40–48, sub-heading 28, card 20–22, lede 18, body 16, small 14, tiny 12–13 (px). No one-off sizes |
| Heading case | **(open decision: sentence case as in the existing designs, or Title Case)** |
| Section labels | Pill with a teal dot |
| Widths | Page 1280px (`wrap`). Reading text at most 720px. Tables and forms 960px |
| Grid | 12 columns, 24px gaps, 32px on large screens |
| Cards | White, tinted outline, soft shadow, 20px corners, 28–32px inner padding |
| Buttons | Navy pill (primary), outlined pill (secondary), teal-to-peach gradient ("Get Started", once per page), white pill on teal gradients, plus an official small size for the header |
| Navigation | Keep the current mega menu. White header that turns frosted on scroll |
| Screenshots | Browser or phone frame on a soft glow. Never cropped until unreadable. On phones prefer mobile screenshots |
| Mascots | One main mascot per page, plus at most one supporting mascot where it explains something. Page-specific, not repeated randomly. Mascot style **(open decision where flat and newer styles differ)** |
| Feature icons | **(open decision: keep the multicolor icons from the Features design, or teal family only)** |
| Backgrounds | White first. Glow for heroes. Faint slanted capsule outlines. Light-cyan panels for highlights |
| Responsive | Check at 375, 768, 1280 and 1440px. Tap targets at least 44px. No sideways scrolling |

## 6. Page-specific design

**Shared on every page:** colors, typography, spacing, cards, buttons, header and footer, screenshot frame style.

**Can vary by page:** hero composition, mascot, screenshot selection, card layouts (grid, tabs, table, bento, timeline) and section interactions.

Avoid making every page look the same. Do not repeat the same three-card row or the same hero on every page.

## 7. Motion principles (Hulio)

Observed on Hulio on 2026-11-06:

- Smooth scrolling
- Content fading in while rising about 10–20px
- Elements moving with the scroll
- Images growing into place
- Rounded sections sliding over each other
- Sideways-scrolling logo rows

Rules:

- Motion is chosen section by section, only after that section's static design is approved
- Use transform and opacity only, roughly 500–800ms with small staggers
- Use CSS for simple effects. Add Motion for React only when scroll-linked effects need it. GSAP is not planned
- Smooth-scroll libraries such as Lenis need a separate decision
- Keep reduced-motion support. With it on, effects become a simple fade or nothing
- On phones, use lighter motion and no pinned scrolling sections

## 8. How we work, page by page

1. Prepare the page's assets: mascots, screenshots, references
2. Plan the page: purpose, sections and asset placement, within the existing structure
3. Design one section at a time, with options
4. Owner approves
5. Build it with existing components and tokens
6. Propose motion, owner approves, then build it
7. Check desktop, tablet and phone widths
8. Owner gives final sign-off before the next page

Order: assets and design system foundations first, then the **Homepage** (a new concept on the existing planned structure), then other pages as the owner chooses.

## 9. Open items

- Figma file link, to read the exact peach, gradient values and font
- Heading case: sentence case or Title Case
- Feature icons: multicolor or teal family
- Mascot style where flat and newer styles differ
- Update the `vanforces-design-director` skill to match this document. It still names BeatRoute and Title Case. Show the change to the owner before saving

## 10. Approved updates (2026-11-09)

Approved by the owner while building the homepage hero. These sit on top of the sections above.

**Main button.** A black pill with white text, resting on a teal-to-orange rim (`btn-rim` in `globals.css`, set by the `primary` variant in `Button.tsx`). Applies to every main button on the site. Secondary buttons stay outlined. The teal button on dark bands is unchanged. The rim colors were estimated from the owner's design, so confirm them from Figma.

**Wider color family.** Teal stays the main brand color. The mascot's orange (`brand-orange`) is its warm partner. Five supporting accents label categories: green, blue, amber, orange and violet, each with a `soft` tint, a main tone and a `deep` tone for text (tokens `accent-*` in `globals.css`). Rules: roughly 80% white and neutral, 12% teal family, 6% peach and orange, 2% accents. Accents are small details only (icon tiles, dots, chips, chart series), never large fills. Red is for errors only. The journey stages map Plan to teal, Stock to green, Sell to blue, Deliver to amber, Collect to orange and Analyse to violet. These are tokens only so far. They are not yet applied to the Journey or Explore sections.

**Hero rules.**
- Centered text. One supporting line only, no second paragraph and no capability list
- One smooth background wash (peach to cyan, fading to white), not separate glow blobs
- Real dashboard screens fade between tabs inside one browser frame, with a progress line. It pauses on hover and focus and stays still under reduced motion
- Customer logos drift slowly sideways with soft edges, gray until hovered
- The homepage no longer has the "Built for Businesses" sample-numbers section
- Spacing: about 96px above the label, 80px between buttons and stage, 96px between stage and logos, 112px below

**Motion rules.**
- Only transform and opacity move. No blur
- Load: text rises in one item after another
- Scroll: the stage grows and rises into place, the mascot follows, the text eases away. This uses the browser's own scroll-linked animation, so there is no library. In browsers without it, the hero is simply still
- Do not put `overflow: hidden` on a parent of a scroll-animated element. It stops the effect. Use `overflow: clip`
- Smooth page scrolling (Lenis) was approved on 2026-11-09 after reviewing six reference sites, and is now on (`SmoothScroll.tsx`). It switches off for reduced motion, and anything that scrolls on its own needs `data-lenis-prevent`

**Reference review, 2026-11-09 (Ondrel, Alytics, AlphaOS, Salix, Grovia, Azlytics).** Approved additions:
- Two-tone section titles: the first part in navy, the rest in soft grey (`ink-soft`). Homepage `SectionHeading variant="fine"` with `titleMuted`
- Titles reveal word by word on scroll, and the hero headline on load (`Words`). Opacity and position only, never blur
- Very light warm off-white bands (`paper`) for some sections, such as Explore
- The Command Center is the page's one dark panel: the dashboard grows on a soft stage, cut off by its lower edge, with three readable real crops under it (`cc-*.png`, made by `scripts/crop-command-center.mjs`)
- Entaura is a slim card on a soft multi-colour panel (`mesh-soft`) inside the dark panel
- Homepage pricing will use a plan selector panel (Basic, Premium, Enterprise) rather than repeating the Pricing page
- Batch C (built 2026-11-09): Business Value as three editorial rows; ERP & Integrations as a hub on a soft panel with data tiles and moving lines (`vanforces-mark.svg` in the centre); Pricing as a plan selector on a deep-teal panel with the price-tag mascot; the closing panel is a soft `mesh-soft` card; the footer is restyled on `paper`. The homepage now uses two mascots (hero and pricing), and the only dark navy block is the Command Center
- Motion and content update (2026-11-09): one shared scroll tool (`motion/scroll.ts`, `ScrollScene`) now drives every scroll-linked effect in every browser, replacing the earlier Chrome-only CSS version. The `scene-*` classes in `globals.css` turn the 0 to 1 value `--p` into movement. Explore is pinned and steps through its five areas on wide screens. The Journey line fills on scroll and a light travels along it. The Command Center has pointing labels on the dashboard and the inspector mascot. Value rows focus on the row nearest the middle. The integrations hub flows both ways and is labelled "Master data" and "Transaction data". Entaura shows its Ask, Insight and Watch logos, with wording taken from entaura.ai. The "Explore Plans & Pricing" and "Explore Pricing" buttons scroll to `#plans` on the homepage
- Stories photo: "Opened white van" by Matthew LeJune, Unsplash License (free to use), downloaded 2026-11-09 to `assets/pages/home/photos/` and copied to `public/photos/stories-van.jpg`. It is shown as an illustrative photo with its credit, and the video and quotes stay labelled as samples
- Skipped on purpose: stats rows with made-up numbers, changelog lists, and the sticky scroll-driven list for the homepage. Floating pill header is postponed

## 11. Homepage style applied to all inner pages

Approved after the homepage was signed off. Done through the shared pieces so every page inherits it with its current content:
- Typography: medium-weight, tight titles (`t-page`, `t-section`, `t-card`), pill-style eyebrow labels with a teal dot.
- `PageHero`: soft wash background; text centred when the visual sits below (shown on a light `stage-soft` stage), left-aligned when the visual is beside it.
- `CTASection`: the homepage closing panel (Vanforces teal/cyan wash, words left, mascot right).
- Cards and feature blocks: larger radius (24-28px), calmer shadows, `band-cyan` tint, `navy-deep` lead card.
- Content is unchanged; it will be edited later.

## 12. Second pass: homepage design on all pages

- Section headings, closing panels and hero stages on inner pages match the homepage.
- Scene photos (AI-generated, marked illustrative) are mapped per page in src/components/product/ScenePhoto.tsx; the three-photo section is also on Platform and Company.
- Real customer logos strip added to module, industry, solution and Platform pages.
- Replace the scene photos with real photos when available.

## 13. Hero van sales scene

- Hero background is plain white; a flat-illustration van sales day sits above the dashboard (src/components/home/VanSalesScene.tsx).
- Built from the real logo (assets/pages/home/logos) and a mascot traced from assets/pages/home/mascots; plays by itself as an 18-second loop, pauses off screen, still image for reduced motion.
- Stops: warehouse (stock loaded), shop (order taken, payment collected), office (day settled). Walking legs, van braking and dust, opening doors, drifting clouds.
- Approved as the final hero animation. Phone shows a cropped scene (warehouse, road, shop).

## 14. Illustrated vignettes across the homepage and inner pages

Same flat illustration style as the hero scene (src/components/illustration/Vignettes.tsx): Journey stops, Business Value cards, Explore items, numbers-band icons plus a peeking mascot, ERP hub tile drawings, and a banner scene on module, industry and solution pages without a photo. Each loops while on screen and is still under reduced motion.
