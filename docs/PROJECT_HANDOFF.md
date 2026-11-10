# Vanforces Website Revamp: Project Handoff

**Saved:** 2026-11-09, from the owner's handover of earlier planning conversations.
**How to use it:** This is the consolidated background for the revamp. The project files are the source of truth for implemented content and technical details. The approved visual direction stays in its own document, [design-direction.md](design-direction.md), and is not replaced by this one. If the two disagree, flag the conflict to the owner before changing anything.

---

## 1. The owner and how to work with them

- The owner designs the Vanforces website. They are experienced at designing manually in Figma, and a **beginner** at AI-assisted design, Claude Code, MCP, custom skills and AI-assisted frontend work.
- They want to **direct** AI design, not hand it over. They want to learn to communicate visual ideas, give references, make precise changes, use reusable skills and design systems, produce maintainable code, connect design tools through MCP and work with editable Figma designs.
- They do **not** want randomly generated websites.

How to communicate:

- Simple, beginner-friendly language. Practical, step-by-step guidance. Few unrelated instructions at once
- Say exactly what to click, copy and where to put files
- Explain the purpose of a tool or skill before recommending it
- Explain design decisions instead of making them silently
- Never assume knowledge of VS Code, terminals, Git or MCP
- Use the **Claude Desktop Code** interface (no VS Code)
- Do not ask again for information already in the project documents or earlier conversations
- Act as a collaborative design partner, not just a code generator

## 2. Project background

- **Product:** Vanforces, B2B software for field sales, distribution operations, business visibility and connected workflows
- **Areas:** field sales, orders, route planning and field execution, inventory and stock, distribution, customers, collections, reporting and analytics, performance monitoring, ERP integration, business intelligence
- **Project:** complete marketing website revamp
- **Tone:** a professional, capable, connected distribution operations platform. Visually impressive, but not confusing, decorative or hard to use

Objectives: clearly explain what Vanforces does, show real product capabilities, explain how the platform connects operations, use real screenshots, mascots and the original identity, have excellent UI/UX and polished motion, work on desktop, tablet and phone, encourage demo bookings, and produce maintainable code that can also be documented in editable Figma.

## 3. Existing project: continue it, do not start again

- Folder: `C:\Users\Lenovo\Documents\Vanforces-Website`
- A backup exists: `Vanforces-Website-Backup`
- Preview runs at `localhost:3000`
- Do **not** create a new project unless clearly justified and approved
- The frontend is a **working prototype, not an approved final website**
- Earlier observations (pages, tokens, components, assets) may be out of date. Inspect the real project before technical decisions

## 4. Existing designs

Two screenshots establish the visual identity. They are **not** the homepage.

- **Features page:** white-dominant, product dashboard, feature sections and cards, mascots, turquoise and cyan accents, business workflow
- **Pricing page:** Basic, Premium and Enterprise plans, brand-gradient cards, comparison table, pricing mascot, rounded cards and buttons
- **Homepage:** not visually finalized. Any homepage in the code is a prototype. It needs a fresh visual concept using the already-planned content
- Pricing amounts and plan features must come from approved product information. Never invent prices, features, customer promises or commercial terms

## 5. Approved references

| Reference | Role |
|---|---|
| **Qarin** https://qarin.framer.website/ | **Primary UI/UX reference:** clean premium SaaS feel, whitespace, typography, hierarchy, card layouts and proportions, borders and shadows, product presentation, consistent spacing. Do not copy its colors, logo, images or exact layouts, and do not make every section identical to it |
| **Hulio** https://hulio.framer.website/ | **Primary motion reference:** smooth scrolling, section entrances, hover effects, UI transitions, coordinated movement, product-screen animation, scroll reveals, natural timing. Inspect real behavior, or ask for a screen recording. Adapt principles, avoid excess, keep it accessible and reduced-motion friendly |
| **BeatRoute** | **Removed.** Not a content, structure or animation reference. The Vanforces content structure takes priority |

Summary: Qarin = UI/UX and card quality. Hulio = motion and interaction. Vanforces = content, branding, screenshots and mascots.

## 6. Visual identity to preserve

Vanforces logo, existing color values, turquoise and teal accents, light-cyan backgrounds, white-dominant look, existing gradients, dark navy or charcoal text, existing typography direction, mascot style, original decorative shapes, real product screenshots. Use existing color tokens, not new colors.

The site should feel premium, modern, clean, professional, trustworthy, spacious, consistent, product-focused, approachable and distinctive.

Avoid: generic AI SaaS templates, random glowing shapes, excess gradients, needless glassmorphism, too many floating elements, random illustrations, inconsistent cards, repeated section compositions, excessive mascots, unreadable screenshots, large amounts of unnecessary text.

## 7. Homepage content structure (nine sections, keep as is)

1. **Hero:** introduce Vanforces and its central value. Real dashboards, phone screens and/or a selected mascot. Clear calls to action
2. **Explore Vanforces:** main capabilities and platform discovery. Do not repeat the Features page in detail
3. **Connected Distribution Journey:** Plan → Stock → Sell → Deliver → Collect → Analyse, shown visually
4. **CXO Business Command Center + Entaura:** management visibility using real dashboards (sales, collections, outstanding, operations, analytics). Entaura is a **smaller supporting tile or section**, not dominant
5. **Customer Stories and Trust:** approved logos, testimonials, case studies or video only. Never fabricate customers, endorsements or statistics
6. **Business Value / ROI:** practical outcomes with meaningful visuals, little text. **No invented numerical ROI claims**
7. **ERP & Integrations:** how Vanforces connects to ERP systems and business apps, clear and credible
8. **Pricing & Get Started:** introduce the plans, lead to the Pricing page, calls to action such as booking a demo or contacting sales. Do not duplicate the Pricing page
9. **Footer:** navigation, product areas, company, resources, contacts, legal

Content rules: keep the agreed structure, keep copy concise, support the story with product visuals, avoid repeating feature descriptions, no sections purely for decoration, consistent terminology, no fictional customers or business figures, no fundamental reorganizing without approval. The exact current copy is in the project files, not in earlier drafts.

## 8. Mascots

- Custom characters are an important part of the brand. Different pages may use different mascots (homepage, pricing, selected feature pages). These assignments are conceptual, not final
- Use the original style. Do not regenerate mascots. Not in every section. Avoid unnecessary repeats. Placement should follow composition and meaning. Keep mascots secondary when the product interface should lead. Scale responsively
- Ask the owner which mascot belongs to a page if not decided
- **Do not assume three mascots on the homepage.** Count and placement are decided in the approved concept

## 9. Product screenshots

- Use actual Vanforces screenshots only. No invented interfaces. Keep them legible. Avoid repeating one dashboard
- Choose screenshots that support the section's message. Use suitable framing, cropping, borders and shadows. Keep the product recognizable
- Ask for missing screenshots instead of filling gaps with random graphics
- Check screenshots for private information before publishing
- Some existing screenshots show zeros or empty charts. Help identify which to recapture with **approved demo data**. Do not invent financial claims or fabricated interfaces

## 10. Asset organization (already created, do not recreate)

```
assets/brand/
assets/pages/home/mascots/
assets/pages/home/screens-web/
assets/pages/home/screens-mobile/
assets/pages/home/references/
assets/pages/README.md
docs/pages/home-assets.md
```

The homepage asset sheet records filename, what it shows, intended section, approval, whether privacy masking is needed and what is still missing. Originals stay separate from public website assets. More page folders are added when needed.

## 11. Skills and MCP

- **Skill:** `.claude/skills/vanforces-design-director/SKILL.md`, tested, available in the slash-command menu. Guides design decisions, consistent branding, reference analysis, SaaS layouts, reviews, beginner-friendly explanations, approval before major code changes and responsive consistency. Read it and follow it. Do not overwrite it without reviewing it
- **Figma MCP:** connected and verified. Free Starter plan with View seats, so **do not assume write operations are allowed**. Respect plan limits. Use it only when it genuinely helps. Avoid unnecessary calls

## 12. Two final deliverables

**A. Working frontend:** all required pages, consistent design system, professional typography, real screenshots, original mascots, working navigation, functional interactions, smooth animations, responsive layouts, reusable components, maintainable code.

**B. Editable Figma design:** page frames, editable text, cards and layout elements, reusable components where supported, consistent styles, clear specs, organized layers. **Not** flattened screenshots.

Agreed code-first workflow: define direction, plan a page, approve layout and treatment, build in the frontend, review in the browser, explore transferring the approved page to editable Figma layers, refine the Figma file, then the next page. Verify the real Figma capabilities before promising editable-layer conversion. If direct generation is restricted, explain the alternatives honestly and never pass off a screenshot as an editable design.

## 13. Design workflow

A. Select a page → B. Review its content → C. Define its visual concept (distinct options inspired by Qarin-level polish) → D. Choose page-specific assets (owner supplies mascots, screenshots, references) → E. Design one section, starting with the hero, proposing the treatment first → F. Implement the approved section, touching only the relevant components → G. Review in the browser (spacing, type, balance, screenshots, responsiveness, usability) → H. Add Hulio-inspired motion after the static layout is approved → I. Finalize, record the decisions, move on. Then the next page. The owner keeps creative control of every major decision.

## 14. Technical standards

Inspect the framework first and preserve the stack. Reusable React components, preserve Next.js routing and architecture, use existing tokens and shared components. Consistent CSS variables, responsive layouts, reusable cards and buttons, predictable spacing, accessible contrast, keyboard navigation, optimized images, reduced-motion support, good performance, SEO structure, clear hierarchy. CSS transitions for simple hovers, Motion for React for coordinated interactions, GSAP only if truly needed, no unnecessary libraries.

## 15. Earlier review findings (inform the redesign, do not auto-change code)

Homepage too long. Repetitive sections. Same dashboard reused. Some hero buttons separated from their content. Too many mascots. Many sections share one layout. Inconsistent spacing. Too many arbitrary font sizes. Inconsistent card corner radii. Duplicated component styles. Some pages may look blank briefly during entrance animations. Mobile needs more visual testing. The token system is a good foundation.

## 16. Homepage directions: NOT approved

- **A, "The Route":** a thin teal route line connects sections. Split hero with a large phone screen, a vertical connected journey, selectively placed mascots. Previously recommended, **not approved**
- **B, "Command Deck":** Qarin-inspired bento tiles with large dashboard panels and product close-ups. Strong precision, risk of being busy or repetitive
- **C, "Teal Stage":** bold deep-teal gradient hero with a product rising from it. Strong opening, risk of drifting from the white-dominant brand
- Earlier recommendation: A, possibly using B's tiles in the Command Center. **This is only a recommendation.** The owner may choose one, combine parts or ask for another approach. Do not start implementing A because it was recommended

## 17. Candidate homepage assets (not a mandatory list)

CXO dashboard with demo data, mobile dashboard, route and visit screens, order and invoice screens, delivery or collection screens, warehouse and inventory screens, Target Performance dashboard, Entaura visualization, homepage mascot, customer logos and approved testimonials. First approve the composition, then decide which assets are truly needed. Do not make the owner prepare everything first. If assets are missing, suggest a layout that uses the available material well.

## 18. Working with shared references

The owner may share URLs, Figma links, images, mascots, SVG logos, screenshots, recordings, hover examples, Framer sites or sketches. Do not copy a reference wholesale. First work out what they like (for example card arrangement but not colors, or hover effects but not layout), help separate those qualities, explain the principle, then apply it to the Vanforces system. When asked to move an image or mascot, keep other approved elements unchanged unless told otherwise.

## 19. Approved decisions

1. Continue the existing frontend project
2. Preserve the brand identity
3. Features and Pricing screenshots are the visual references
4. The homepage is unfinished
5. Qarin is the main UI/UX reference
6. Hulio is the main motion reference
7. BeatRoute is not a main reference
8. Keep the planned content structure
9. Work page by page and section by section
10. Real product screenshots
11. Page-specific mascots
12. No generic templates or excess decoration
13. Both working frontend code and editable Figma designs
14. Keep working code where practical
15. Discuss major decisions before implementing
16. Beginner-friendly explanations

## 20. Still open

Final homepage concept. Final hero composition. Homepage mascot selection. Exact screenshots per section. Whether to use a route line. Whether the Command Center uses bento tiles. Mascot count and placement. Detailed animation specs. Screenshot crops and framing. Final responsive layouts. The editable Figma workflow under current account permissions. (Suggestions are not approvals.)

## 21. Key project documents

- [design-direction.md](design-direction.md): approved visual direction
- [pages/home-assets.md](pages/home-assets.md): homepage asset sheet
- [../assets/pages/README.md](../assets/pages/README.md): asset organization
- [implementation-progress.md](implementation-progress.md): prototype status
- `.claude/skills/vanforces-design-director/SKILL.md`: design director skill

## 22. Final vision

A distinctive, premium, professional SaaS website combining Qarin-level UI/UX, Hulio-level motion, original Vanforces branding, real Vanforces interfaces, thoughtful mascot use and the existing product content and structure. It should feel professionally designed, not automatically generated. The owner directs the creative decisions. The longer-term goal is a repeatable AI-assisted design workflow they can reuse professionally.
