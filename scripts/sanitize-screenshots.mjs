// Creates privacy-safe copies of the product screenshots in public/product.
// Originals in assets/ are not changed. Masks are opaque, so covered text cannot be recovered.
// Run with: node scripts/sanitize-screenshots.mjs
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const out = "public/product";
mkdirSync(out, { recursive: true });

const SKELETON = "#dfe5e8";

// wipe: paint the area with the surrounding background colour. bar: add a neutral bar so the
// reader can see that something was deliberately covered.
const wipe = (x0, y0, x1, y1, bg = "#ffffff") => ({ x0, y0, x1, y1, bg, bar: false });
const bar = (x0, y0, x1, y1, bg = "#ffffff") => ({ x0, y0, x1, y1, bg, bar: true });

const rows = (ys, x0, x1, half = 8, bg = "#ffffff") => ys.map((y) => bar(x0, y - half, x1, y + half, bg));

const distributorRows = [223, 288, 353, 418, 483, 548, 613, 678, 743, 808];
const productRows = [219, 273, 316, 371, 425, 479, 533, 587, 641, 695];
const userRows = [214, 263, 312, 366, 424, 477, 526, 575, 624, 673];
const outlookCards = [19, 286, 553, 820, 1087, 1354, 1621];

const jobs = [
  {
    from: "Screenshot 2026-10-19 121946.png",
    to: "cxo-finance",
    masks: [wipe(36, 8, 216, 19)],
  },
  {
    from: "Screenshot 2026-10-19 121955.png",
    to: "cxo-trends",
    crop: { top: 40, height: 698 },
    masks: [
      ...outlookCards.flatMap((x) => [bar(x + 6, 359, x + 90, 374), bar(x + 6, 420, x + 90, 435)]),
      wipe(14, 50, 60, 206),
      wipe(14, 456, 60, 678),
    ],
  },
  {
    from: "Screenshot 2026-11-04 142021.png",
    to: "admin-home",
    masks: [wipe(160, 16, 192, 31), bar(1805, 15, 1874, 31)],
  },
  {
    from: "Screenshot 2026-11-04 142052.png",
    to: "company-settings",
    masks: [
      wipe(145, 24, 177, 39),
      bar(1806, 23, 1874, 39),
      bar(98, 342, 276, 357),
      bar(632, 672, 706, 687),
    ],
  },
  {
    from: "Screenshot 2026-11-04 142105.png",
    to: "product-list",
    crop: { top: 0, height: 880 },
    masks: [
      wipe(162, 10, 192, 25),
      bar(1805, 9, 1874, 25),
      ...rows(productRows, 300, 490),
      bar(730, 211, 866, 227),
      bar(578, 211, 666, 227),
      wipe(1438, 745, 1540, 762),
      wipe(1752, 745, 1782, 762),
    ],
  },
  {
    from: "Screenshot 2026-11-04 142111.png",
    to: "distributor-list",
    masks: [
      wipe(157, 14, 188, 29),
      bar(1802, 14, 1871, 29),
      ...rows(distributorRows, 185, 256),
      ...rows(distributorRows, 338, 436),
      ...rows(distributorRows, 505, 582),
      ...rows(distributorRows, 644, 731),
      wipe(1428, 858, 1532, 875),
      wipe(1746, 858, 1776, 875),
    ],
  },
  {
    from: "Screenshot 2026-11-04 142117.png",
    to: "user-list",
    masks: [
      wipe(159, 13, 190, 27),
      bar(1805, 13, 1873, 27),
      ...rows(userRows, 173, 402, 19),
      ...rows(userRows, 422, 526),
      ...rows(userRows, 671, 881),
      wipe(1166, 303, 1234, 323),
    ],
  },
  {
    from: "Screenshot 2026-11-04 142128.png",
    to: "route-visit",
    crop: { top: 0, height: 905 },
    masks: [wipe(161, 14, 192, 29), bar(1805, 14, 1873, 29)],
  },
];

const phoneCrop = { top: 72, height: 1456 };

const phoneJobs = [
  {
    from: "Screenshot_20261019-122842.png",
    to: "m-dashboard",
    masks: [
      wipe(355, 103, 453, 154),
      bar(274, 264, 342, 293),
      bar(274, 331, 414, 361),
      bar(274, 399, 682, 431),
      bar(291, 1364, 430, 1393),
    ],
  },
  { from: "Screenshot_20261019-123035.png", to: "m-transactions", masks: [] },
  {
    from: "Screenshot_20261019-123050.png",
    to: "m-route",
    masks: [
      bar(272, 492, 344, 521),
      bar(272, 542, 476, 569),
      bar(272, 846, 344, 873),
      bar(272, 896, 474, 923),
      bar(272, 1199, 344, 1226),
      bar(272, 1249, 470, 1276),
    ],
  },
  {
    from: "Screenshot_20261019-123115.png",
    to: "m-profile",
    masks: [
      bar(315, 577, 394, 605),
      bar(315, 633, 476, 671),
      bar(315, 766, 499, 794),
      bar(315, 829, 480, 857),
    ],
  },
  { from: "Screenshot_20261019-123507.png", to: "m-sync", masks: [bar(164, 146, 558, 173)] },
  {
    from: "Screenshot_20261019-123543.png",
    to: "m-login",
    masks: [
      wipe(14, 84, 146, 136, "#e4eaf3"),
      bar(60, 733, 276, 776, "#eef1f7"),
      bar(60, 963, 164, 1003, "#eef1f7"),
      wipe(406, 1473, 606, 1500),
    ],
  },
  { from: "Screenshot_20261019-123559.png", to: "m-splash", masks: [] },
];

function maskSvg(width, height, masks) {
  const shapes = masks
    .map(({ x0, y0, x1, y1, bg, bar: showBar }) => {
      const w = x1 - x0;
      const h = y1 - y0;
      const base = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="${bg}"/>`;
      if (!showBar) return base;
      const pad = Math.max(2, Math.round(h * 0.18));
      return `${base}<rect x="${x0 + 1}" y="${y0 + pad}" width="${w - 2}" height="${h - pad * 2}" rx="${Math.round((h - pad * 2) / 2)}" fill="${SKELETON}"/>`;
    })
    .join("");
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${shapes}</svg>`);
}

async function run({ from, to, masks, crop }) {
  const input = sharp(`assets/${from}`);
  const { width, height } = await input.metadata();
  const painted = await input
    .composite(masks.length ? [{ input: maskSvg(width, height, masks) }] : [])
    .png()
    .toBuffer();
  let image = sharp(painted);
  if (crop) image = image.extract({ left: 0, top: crop.top, width, height: crop.height });
  const info = await image.png({ compressionLevel: 9 }).toFile(`${out}/${to}.png`);
  console.log(`${to}.png ${info.width}x${info.height}`);
}

for (const job of jobs) await run(job);
for (const job of phoneJobs) await run({ ...job, crop: phoneCrop });
