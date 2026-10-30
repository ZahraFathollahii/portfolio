/**
 * Turns the original profile photo into the files the hero renders (see src/lib/photo.ts):
 * square crops as WebP (320w + 640w) and a 640w JPEG fallback, with all metadata stripped
 * (EXIF incl. GPS, XMP, IPTC, ICC — pixels are converted to sRGB first).
 *
 * Input: exactly one of photo-source/profile.{jpg,jpeg,png,webp} (git-ignored — the original
 * keeps its metadata). Output: public/images/profile/ (committed).
 *
 * Run: `yarn photo:build`, then `yarn build`.
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";

import sharp from "sharp";

import { importApp, root } from "./app-modules.mts";

const { photoFiles } =
  await importApp<typeof import("../src/lib/photo.ts")>("lib/photo.ts");

const sourceDir = join(root, "photo-source");
const accepted = ["jpg", "jpeg", "png", "webp"];
const sources = accepted
  .map((extension) => join(sourceDir, `profile.${extension}`))
  .filter((path) => existsSync(path));

if (sources.length !== 1) {
  console.error(
    sources.length === 0
      ? `No photo found. Put one file at photo-source/profile.{${accepted.join(",")}}.`
      : `Found ${sources.length} photos — keep exactly one:\n  ${sources.map((path) => relative(root, path)).join("\n  ")}`,
  );
  process.exit(1);
}

const source = sources[0]!;
const { width = 0, height = 0 } = await sharp(source).metadata();
if (Math.min(width, height) < photoFiles.size) {
  console.warn(
    `Warning: source is ${width}×${height}; it will be upscaled to ${photoFiles.size}px. Use a larger original if you can.`,
  );
}

// rotate() applies the EXIF orientation before the metadata is dropped;
// "attention" crops the square around the most salient region (the face).
function square(size: number) {
  return sharp(source)
    .rotate()
    .toColourspace("srgb")
    .resize(size, size, { fit: "cover", position: "attention" });
}

const outputs = [
  ...photoFiles.webp.map((file) => ({
    file,
    image: square(file.width).webp({ quality: 82 }),
  })),
  {
    file: photoFiles.jpeg,
    image: square(photoFiles.jpeg.width).jpeg({ quality: 82, mozjpeg: true }),
  },
];

for (const { file, image } of outputs) {
  const target = join(root, "public", file.path);
  mkdirSync(dirname(target), { recursive: true });
  const info = await image.toFile(target);
  const written = await sharp(target).metadata();
  const leftovers = (["exif", "xmp", "iptc", "icc"] as const).filter(
    (key) => written[key] !== undefined,
  );
  if (leftovers.length > 0) {
    console.error(`${file.path} still has metadata: ${leftovers.join(", ")}`);
    process.exit(1);
  }
  console.log(
    `✓ public${file.path} — ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB, no metadata`,
  );
}
