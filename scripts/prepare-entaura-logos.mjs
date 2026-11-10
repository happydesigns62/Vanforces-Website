// Prepares the Entaura Ask, Insight and Watch logos for the homepage. Originals in assets/pages/home/logos are not changed.
// It trims empty margins and resizes to 720px wide, which is plenty for the card size, and writes to public/brand.
// Run with: node scripts/prepare-entaura-logos.mjs
import sharp from "sharp";

const logos = [
  { from: "entaura ask.png", to: "entaura-ask.png" },
  { from: "entaura insight.png", to: "entaura-insight.png" },
  { from: "entaura watch.png", to: "entaura-watch.png" },
];

for (const { from, to } of logos) {
  const info = await sharp(`assets/pages/home/logos/${from}`)
    .trim({ threshold: 18 })
    .resize({ width: 720, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(`public/brand/${to}`);
  console.log(`${to} ${info.width}x${info.height}`);
}
