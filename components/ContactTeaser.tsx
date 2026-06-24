"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone, CalendarCheck } from "lucide-react";
import { site } from "@/content/site";
import { useScrollReveal } from "@/lib/useScrollReveal";

/** Anchored CTA teaser on the home page that points to the /contact page. */
export function ContactTeaser() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.1, y: 24 });

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div ref={ref} className="container-px">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-light to-primary-800 px-6 py-14 text-white sm:px-12 lg:px-16">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span
                data-reveal
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-200"
              >
                Ready when you are
              </span>
              <h2
                data-reveal
                className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl"
              >
                See StoreX running in your store
              </h2>
              <p data-reveal className="mt-4 max-w-md text-white/70">
                Book a personalized demo and we&apos;ll show you how StoreX fits
                your retail or hospitality workflow branches, loyalty, tax and
                all.
              </p>

              <div data-reveal className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  <CalendarCheck className="h-4 w-4" aria-hidden />
                  Book a Demo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link href="/contact" className="btn-ghost-light">
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* Contact details card */}
            <div
              data-reveal
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm"
            >
              <p className="text-sm font-semibold text-white">Talk to us directly</p>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-500/20 text-primary-200">
                      <Mail className="h-4 w-4" aria-hidden />
                    </span>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-500/20 text-primary-200">
                      <Phone className="h-4 w-4" aria-hidden />
                    </span>
                    {site.phone}
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-xs text-white/50">
                Typical response time: within one business day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
