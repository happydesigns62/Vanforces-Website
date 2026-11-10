// Prepares the customer logos for the homepage "Trusted by" row.
// Originals in assets/pages/home/logos are not changed. Output goes to public/logos.
// It trims empty margins, and turns the light-grey background of one logo white so it sits cleanly on a white tile.
// Run with: node scripts/prepare-home-logos.mjs
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const src = "assets/pages/home/logos";
const out = "public/logos";
mkdirSync(out, { recursive: true });

const logos = [
  { from: "logo-agc.png.png", to: "agc.png" },
  { from: "logo-chefhouse.png.png", to: "chefouse.png", whiten: true },
  { from: "logo-kaku.png.png", to: "kaku.png" },
  { from: "logo-maximus.png.png", to: "maximus.png" },
  { from: "logo-punathil.png.png", to: "punathil.png" },
  { from: "logo-QTerminals.png.png", to: "qterminals.png" },
];

async function whitenLightGrey(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (Math.min(r, g, b) >= 228 && Math.max(r, g, b) - Math.min(r, g, b) <= 10) {
      data[i] = data[i + 1] = data[i + 2] = 255;
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

for (const { from, to, whiten } of logos) {
  let buffer = await sharp(`${src}/${from}`).png().toBuffer();
  if (whiten) buffer = await whitenLightGrey(buffer);
  const info = await sharp(buffer).trim({ threshold: 14 }).png({ compressionLevel: 9 }).toFile(`${out}/${to}`);
  console.log(`${to} ${info.width}x${info.height}`);
}
