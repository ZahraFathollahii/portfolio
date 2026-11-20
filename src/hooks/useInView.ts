"use client";

import { useEffect, useRef, useState } from "react";

/**
 * `null` until the observer first reports, then whether the element has entered the viewport.
 * Sticky: once true it stays true and the observer disconnects.
 * Starting at `null` (not `false`) keeps server HTML and no-JS visitors fully visible.
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: "0px 0px -10% 0px" },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState<boolean | null>(null);
  const { root, rootMargin, threshold } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry?.isIntersecting ?? false;
        setInView(isIntersecting);
        if (isIntersecting) observer.disconnect();
      },
      { root, rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return [ref, inView] as const;
}
