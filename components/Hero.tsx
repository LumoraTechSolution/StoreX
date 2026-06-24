"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { DashboardMockup } from "@/components/DashboardMockup";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Reduced motion: reveal everything immediately, no timeline, no float.
    if (reduced) {
      gsap.set(el.querySelectorAll("[data-anim]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-anim='eyebrow']", { opacity: 0, y: 16, duration: 0.5 })
        .from(
          "[data-anim='word']",
          { opacity: 0, y: 28, duration: 0.6, stagger: 0.08 },
          "-=0.2"
        )
        .from(
          "[data-anim='subhead']",
          { opacity: 0, y: 20, duration: 0.6 },
          "-=0.3"
        )
        .from(
          "[data-anim='cta']",
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .from(
          "[data-anim='trust']",
          { opacity: 0, y: 16, duration: 0.5 },
          "-=0.2"
        )
        .from(
          "[data-anim='mockup']",
          { opacity: 0, y: 40, scale: 0.96, duration: 0.9 },
          "-=0.7"
        );

      // Subtle, continuous float on the mockup + chips (parallax feel).
      gsap.to("[data-float='panel']", {
        y: -12,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to("[data-float='chip-a']", {
        y: 10,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to("[data-float='chip-b']", {
        y: -10,
        duration: 2.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const headline = ["Run", "your", "whole", "shop", "from", "one", "POS."];

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 via-white to-white pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid opacity-60" />
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />

      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div>

          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.07] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {headline.map((word, i) => (
              <span
                key={i}
                data-anim="word"
                className={`inline-block ${
                  word === "one" || word === "POS."
                    ? "text-primary-600"
                    : ""
                }`}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <p
            data-anim="subhead"
            className="mt-5 max-w-xl text-lg leading-relaxed text-navy/70"
          >
            StoreX unifies multi-branch sales, finance, loyalty and secure
            staff access in one fast platform in the browser or as a native
            Windows app, always synced in the cloud.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link data-anim="cta" href="/contact" className="btn-primary">
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link data-anim="cta" href="/#features" className="btn-secondary">
              See Features
            </Link>
          </div>

        </div>

        {/* Mockup */}
        <div data-anim="mockup" className="relative lg:pl-6">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
