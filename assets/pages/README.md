# Page assets

Put original files for each page here, one folder per page. Nothing in `assets/` is published on the website.

| Folder | Put here |
|---|---|
| `mascots/` | Mascot illustrations chosen for this page |
| `screens-web/` | Desktop dashboard screenshots, full size, uncropped |
| `screens-mobile/` | Phone app screenshots, full size, uncropped |
| `references/` | Reference screenshots, screen recordings and notes |

Brand files exported from Figma (logo, colors, gradients, font) go in `assets/brand/`.

File names don't matter. Every file is described in the page's asset sheet in `docs/pages/`, for example `docs/pages/home-assets.md`.

Screenshots can contain real names, phone numbers and amounts. They are only published as masked copies made by `scripts/sanitize-screenshots.mjs`, after a check by eye.
