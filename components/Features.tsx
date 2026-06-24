"use client";

import { ArrowUpRight } from "lucide-react";
import { features, type Feature, type FeatureVisual } from "@/content/features";
import { useScrollReveal } from "@/lib/useScrollReveal";

/** Muted, per-category accent so the grid reads as designed, not templated. */
const categoryChip: Record<string, string> = {
  Operate: "bg-primary-50 text-primary-700",
  Sell: "bg-emerald-50 text-emerald-700",
  Grow: "bg-amber-50 text-amber-700",
  Secure: "bg-violet-50 text-violet-700",
  Platform: "bg-indigo-50 text-indigo-700",
};

const categoryIcon: Record<string, string> = {
  Operate: "bg-primary-50 text-primary-600 ring-primary-100",
  Sell: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  Grow: "bg-amber-50 text-amber-600 ring-amber-100",
  Secure: "bg-violet-50 text-violet-600 ring-violet-100",
  Platform: "bg-indigo-50 text-indigo-600 ring-indigo-100",
};

const categories = ["Sell", "Operate", "Grow", "Secure", "Platform"];

export function Features() {
  const ref = useScrollReveal<HTMLDivElement>({ stagger: 0.06, y: 24 });

  return (
    <section id="features" className="scroll-mt-20 bg-slate-50/70 py-20 sm:py-28">
      <div ref={ref} className="container-px">
        {/* Asymmetric header — heading left, context right */}
        <div className="grid items-end gap-6 border-b border-navy/10 pb-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {/* <span data-reveal className="eyebrow">
              Capabilities
            </span> */}
            <h2
              data-reveal
              className="mt-4 max-w-xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl"
            >
              Everything the counter needs.{" "}
              <span className="text-primary-600">Nothing it doesn&apos;t.</span>
            </h2>
          </div>
          <div data-reveal className="lg:pb-1">
            <p className="text-navy/65">
              StoreX covers the full retail &amp; hospitality flow selling,
              operating, growing and securing in one platform you can actually
              run a chain on.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryChip[c]}`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[212px] lg:grid-cols-4 lg:[grid-auto-flow:dense]">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  // ---- Featured spotlight (dark, 2×2) -------------------------------------
  if (feature.featured) {
    return (
      <article
        data-reveal
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-light p-7 text-white shadow-card sm:col-span-2 lg:row-span-2"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-primary-200">
              {feature.category}
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-500/20 text-primary-200 ring-1 ring-white/10">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-bold tracking-tight">
            {feature.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            {feature.description}
          </p>
        </div>
        <Visual kind={feature.visual} dark />
      </article>
    );
  }

  // ---- Wide card (light, text + mini visual) ------------------------------
  if (feature.wide) {
    return (
      <article
        data-reveal
        className="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-navy/5 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card sm:col-span-2"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <CardEyebrow feature={feature} />
          <h3 className="mt-4 text-lg font-bold text-navy">{feature.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
            {feature.description}
          </p>
        </div>
        <div className="hidden w-36 shrink-0 self-stretch sm:flex sm:items-center">
          <Visual kind={feature.visual} />
        </div>
      </article>
    );
  }

  // ---- Standard compact card ----------------------------------------------
  return (
    <article
      data-reveal
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-navy/5 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
    >
      {/* Faint index number, top-right */}
      <span className="pointer-events-none absolute right-5 top-4 text-2xl font-black tabular-nums text-navy/[0.06]">
        {String(index).padStart(2, "0")}
      </span>
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ${
          categoryIcon[feature.category]
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-navy/40">
        {feature.category}
      </p>
      <h3 className="mt-1 text-base font-bold text-navy">{feature.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
        {feature.description}
      </p>
      <ArrowUpRight
        className="mt-auto h-4 w-4 translate-y-1 text-primary-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
    </article>
  );
}

function CardEyebrow({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ${
          categoryIcon[feature.category]
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
          categoryChip[feature.category]
        }`}
      >
        {feature.category}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Inline mini-visuals — decorative, hidden from assistive tech.              */
/* -------------------------------------------------------------------------- */

function Visual({ kind, dark = false }: { kind?: FeatureVisual; dark?: boolean }) {
  if (!kind) return null;
  switch (kind) {
    case "branches":
      return <BranchesVisual />;
    case "chart":
      return <ChartVisual dark={dark} />;
    case "devices":
      return <DevicesVisual dark={dark} />;
    case "receipt":
      return <ReceiptVisual dark={dark} />;
    default:
      return null;
  }
}

function BranchesVisual() {
  const branches = [
    { name: "Downtown", sales: "$4.8k" },
    { name: "Harbour Mall", sales: "$3.2k" },
    { name: "Airport Kiosk", sales: "$1.9k" },
  ];
  return (
    <div
      aria-hidden
      className="relative mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-white/70">Branches</span>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
          6 / 6 online
        </span>
      </div>
      <ul className="space-y-2.5">
        {branches.map((b) => (
          <li key={b.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {b.name}
            </span>
            <span className="font-semibold text-white">{b.sales}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartVisual({ dark }: { dark: boolean }) {
  const bars = [40, 62, 48, 75, 58, 90];
  return (
    <div aria-hidden className="flex h-20 w-full items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t ${
            dark
              ? "bg-gradient-to-t from-primary-700 to-primary-300"
              : "bg-gradient-to-t from-primary-200 to-primary-500"
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function DevicesVisual({ dark }: { dark: boolean }) {
  const frame = dark ? "border-white/15 bg-white/5" : "border-navy/10 bg-slate-50";
  const accent = dark ? "bg-primary-400/60" : "bg-primary-300";
  return (
    <div aria-hidden className="flex w-full items-end justify-center gap-2">
      {/* Browser */}
      <div className={`w-20 rounded-lg border p-1.5 ${frame}`}>
        <div className="mb-1 flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-red-400" />
          <span className="h-1 w-1 rounded-full bg-amber-400" />
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
        </div>
        <div className={`h-1.5 w-3/4 rounded ${accent}`} />
        <div className="mt-1 h-1.5 w-1/2 rounded bg-current opacity-20" />
      </div>
      {/* Desktop */}
      <div className="flex flex-col items-center">
        <div className={`w-14 rounded-md border p-1.5 ${frame}`}>
          <div className={`h-1.5 w-full rounded ${accent}`} />
          <div className="mt-1 h-1.5 w-2/3 rounded bg-current opacity-20" />
        </div>
        <div className={`mt-0.5 h-1 w-6 rounded-b ${frame} border`} />
      </div>
    </div>
  );
}

function ReceiptVisual({ dark }: { dark: boolean }) {
  const paper = dark ? "bg-white/10 text-white/70" : "bg-slate-50 text-navy/60";
  const line = dark ? "bg-white/20" : "bg-navy/15";
  return (
    <div
      aria-hidden
      className={`mx-auto w-24 rounded-md px-3 py-3 text-[9px] leading-tight ${paper}`}
    >
      <div className="mb-2 flex justify-between">
        <span className={`h-1 w-8 rounded ${line}`} />
        <span className={`h-1 w-4 rounded ${line}`} />
      </div>
      <div className="mb-1 flex justify-between">
        <span className={`h-1 w-10 rounded ${line}`} />
        <span className={`h-1 w-4 rounded ${line}`} />
      </div>
      <div className="flex items-center justify-between rounded bg-primary-500/15 px-1.5 py-1">
        <span className="font-bold text-primary-600">VAT</span>
        <span className="font-bold text-primary-600">incl.</span>
      </div>
    </div>
  );
}
