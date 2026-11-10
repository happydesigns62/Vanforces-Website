// Creates privacy-safe PREVIEW copies of the homepage hero screenshots.
// Originals in assets/pages/home/screens-web are not changed.
// Previews go to assets/pages/home/masked-preview (not published). After approval they move to public/.
// Run with: node scripts/sanitize-home-hero.mjs
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const src = "assets/pages/home/screens-web";
const out = "assets/pages/home/masked-preview";
mkdirSync(out, { recursive: true });

const SKELETON = "#dfe5e8";
const wipe = (x0, y0, x1, y1, bg = "#ffffff") => ({ x0, y0, x1, y1, bg, bar: false });
const bar = (x0, y0, x1, y1, bg = "#ffffff") => ({ x0, y0, x1, y1, bg, bar: true });

const jobs = [
  {
    from: "hero-dashboard.png.png",
    to: "hero-dashboard.png",
    // DEV badge next to the logo, and the signed-in user's name at the top right.
    masks: [wipe(160, 14, 192, 31), bar(1803, 13, 1875, 29)],
  },
  {
    from: "hero-cxo-command-center.png.png",
    to: "hero-cxo-command-center.png",
    // Company label above the page title.
    masks: [wipe(46, 6, 228, 18)],
  },
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

for (const { from, to, masks } of jobs) {
  const input = sharp(`${src}/${from}`);
  const { width, height } = await input.metadata();
  const info = await input
    .composite([{ input: maskSvg(width, height, masks) }])
    .png({ compressionLevel: 9 })
    .toFile(`${out}/${to}`);
  console.log(`${to} ${info.width}x${info.height}`);
}
