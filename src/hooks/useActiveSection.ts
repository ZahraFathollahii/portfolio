"use client";

import { useEffect, useState } from "react";

/**
 * Id of the last section whose top has passed the middle of the viewport, or null above the first one.
 * The observer only signals that something crossed the middle line; the active id is recomputed from
 * positions each time, so instant jumps (e.g. Home key) can't leave a stale value.
 * `ids` must be stable (module-level constant) and in document order.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    function update() {
      const middle = window.innerHeight / 2;
      const passed = elements.filter(
        (element) => element.getBoundingClientRect().top <= middle,
      );
      setActiveId(passed.at(-1)?.id ?? null);
    }

    const observer = new IntersectionObserver(update, {
      rootMargin: "-50% 0px -50% 0px",
    });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
