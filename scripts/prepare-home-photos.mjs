// Turns the homepage scene photos in assets/pages/home/photos into small web files in public/photos.
// The crops remove blurred shop signs (delivery stop) and a brand mark on the monitor (office).
import sharp from "sharp";

const from = "assets/pages/home/photos";
const jobs = [
  { name: "warehouse-loading", width: 1448 },
  { name: "shop-counter", width: 1448 },
  { name: "delivery-stop", width: 1200, crop: { left: 0, top: 240, width: 1672, height: 701 } },
  { name: "office", width: 1120, crop: { left: 480, top: 0, width: 1120, height: 668 } },
];

for (const { name, width, crop } of jobs) {
  let image = sharp(`${from}/${name}.png`);
  if (crop) image = image.extract(crop);
  const info = await image.resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/photos/${name}.webp`);
  console.log(name, info.width, info.height, `${Math.round(info.size / 1024)}KB`);
}
