import { BASE_PATH } from "@/config/site";

/**
 * Prefixes a `public/` asset path with the base path.
 * `next/link`, `next/image` and `next/font` do this themselves — raw `<a>`/`<img>` and metadata URLs don't.
 */
export function assetPath(path: `/${string}`): string {
  return `${BASE_PATH}${path}`;
}
