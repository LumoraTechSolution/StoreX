"use client";

import { highlights } from "@/content/highlights";
import { useScrollReveal } from "@/lib/useScrollReveal";

/** Dark "Why StoreX" strip with value props, for visual contrast. */
export function Highlights() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section
      id="why"
      className="scroll-mt-20 bg-navy py-20 text-white sm:py-24"
    >
      <div ref={ref} className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200"
          >
            Why StoreX
          </span>
          <h2
            data-reveal
            className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Dependable where it counts
          </h2>
          <p data-reveal className="mt-4 text-lg text-white/70">
            The fundamentals retail and hospitality teams actually need fast,
            secure, and ready for many locations.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.stat}
                data-reveal
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-primary-400/40 hover:bg-white/[0.07]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-500/20 text-primary-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xl font-bold">{h.stat}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {h.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
