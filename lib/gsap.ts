/**
 * Centralized GSAP setup. ScrollTrigger is registered exactly once, on the
 * client only. Import { gsap, ScrollTrigger } from here in any client component.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// `gsap.registerPlugin` is safe to call multiple times but we guard for SSR:
// plugins must never be registered during server rendering.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
