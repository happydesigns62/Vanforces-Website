// Cuts readable pieces out of already-masked screens in public/product, for cards on the homepage.
// The sources are the privacy-masked copies, so nothing private is added.
// Run with: node scripts/crop-command-center.mjs
import sharp from "sharp";

const crops = [
  // Command Center, from the masked Finance Command Center screen.
  { source: "hero-cxo-command-center", to: "cc-insights", left: 24, top: 286, width: 462, height: 80 },
  { source: "hero-cxo-command-center", to: "cc-kpis", left: 12, top: 388, width: 384, height: 130 },
  { source: "hero-cxo-command-center", to: "cc-funnel", left: 22, top: 652, width: 520, height: 86 },
  // Business Value rows: a mobile route plan, the mobile transaction menu, and the sales and collection trend chart.
  { source: "m-route", to: "val-route", left: 0, top: 200, width: 720, height: 520 },
  { source: "m-transactions", to: "val-transactions", left: 0, top: 0, width: 720, height: 640 },
  { source: "cxo-trends", to: "val-trends", left: 0, top: 0, width: 1080, height: 232 },
];

for (const { source, to, left, top, width, height } of crops) {
  const info = await sharp(`public/product/${source}.png`).extract({ left, top, width, height }).png({ compressionLevel: 9 }).toFile(`public/product/${to}.png`);
  console.log(`${to}.png ${info.width}x${info.height}`);
}
