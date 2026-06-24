"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has requested reduced motion.
 * Defaults to `true` during SSR / first paint so we never flash heavy
 * animations before we know the user's preference.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
