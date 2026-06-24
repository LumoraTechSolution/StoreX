"use client";

import { useEffect, useRef } from "react";
// Importing from lib/gsap ensures ScrollTrigger is registered before use.
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ScrollRevealOptions {
  /** CSS selector for the elements to stagger-reveal within the container. */
  selector?: string;
  /** Seconds between each child's reveal. */
  stagger?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Fade + slide-up reveal on scroll, staggered across matching children.
 * Respects prefers-reduced-motion (elements are simply shown, no motion) and
 * cleans up its ScrollTriggers/animations on unmount.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  selector = "[data-reveal]",
  stagger = 0.1,
  y = 28,
  start = "top 82%",
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;

    // Reduced motion: ensure everything is visible, skip all animation.
    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    // Scope GSAP so cleanup reverts only this component's tweens.
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.7,
        ease: "power2.out",
        stagger,
        scrollTrigger: {
          trigger: root,
          start,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, selector, stagger, y, start]);

  return ref;
}
