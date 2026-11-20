import { existsSync } from "node:fs";
import { join } from "node:path";

import { assetPath } from "@/lib/paths";

/**
 * Square crops written by `yarn photo:build` (scripts/photo-build.mts) from
 * photo-source/profile.{jpg,jpeg,png,webp}. Paths are relative to public/.
 */
export const photoFiles = {
  size: 640,
  webp: [
    { width: 320, path: "/images/profile/profile-320.webp" },
    { width: 640, path: "/images/profile/profile-640.webp" },
  ],
  jpeg: { width: 640, path: "/images/profile/profile-640.jpg" },
} as const;

export type ProfilePhoto = {
  /** For <source type="image/webp">. */
  srcSet: string;
  /** JPEG <img> fallback. */
  src: string;
  /** Intrinsic width = height. */
  size: number;
};

/** Build-time only (Server Components): the processed photo, or null until all files exist. */
export function getProfilePhoto(): ProfilePhoto | null {
  const files = [...photoFiles.webp, photoFiles.jpeg];
  const isComplete = files.every((file) =>
    existsSync(join(process.cwd(), "public", file.path)),
  );
  if (!isComplete) return null;

  return {
    srcSet: photoFiles.webp
      .map((file) => `${assetPath(file.path)} ${file.width}w`)
      .join(", "),
    src: assetPath(photoFiles.jpeg.path),
    size: photoFiles.size,
  };
}
