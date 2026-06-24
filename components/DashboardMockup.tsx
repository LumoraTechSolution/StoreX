import {
  TrendingUp,
  CreditCard,
  Receipt,
  Users,
  Store,
} from "lucide-react";

/**
 * A lightweight, dependency-free fake POS dashboard rendered entirely in
 * markup (no screenshots needed). Pieces carry `data-float-*` hooks so the
 * Hero can apply subtle parallax. Decorative — hidden from assistive tech.
 */
export function DashboardMockup() {
  return (
    <div className="relative select-none" aria-hidden="true">
      {/* Glow behind the panel */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary-300/30 via-primary-200/20 to-transparent blur-2xl" />

      {/* Main window */}
      <div
        data-float="panel"
        className="overflow-hidden rounded-2xl border border-white/60 bg-white shadow-card ring-1 ring-navy/5"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-navy/5 bg-navy px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-medium text-white/70">
            StoreX · Downtown Branch
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 sm:p-5">
          {/* KPI cards */}
          <KpiCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Today's sales"
            value="$4,820"
            trend="+12.4%"
          />
          <KpiCard
            icon={<Receipt className="h-4 w-4" />}
            label="Transactions"
            value="318"
            trend="+8.1%"
          />
          <KpiCard
            icon={<Users className="h-4 w-4" />}
            label="New loyalty"
            value="42"
            trend="+5.0%"
          />

          {/* Chart */}
          <div className="col-span-2 rounded-xl border border-navy/5 bg-primary-50/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-navy/70">Revenue · 7 days</p>
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">
                Live
              </span>
            </div>
            <div className="flex h-24 items-end gap-2">
              {[42, 58, 36, 70, 52, 84, 64].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary-300 to-primary-500"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Mini cart / checkout */}
          <div className="rounded-xl border border-navy/5 bg-white p-4 shadow-soft">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-navy/70">
              <CreditCard className="h-3.5 w-3.5 text-primary-600" /> Checkout
            </p>
            <ul className="space-y-2 text-[11px] text-navy/70">
              <li className="flex justify-between">
                <span>Flat White</span>
                <span className="font-semibold text-navy">$4.50</span>
              </li>
              <li className="flex justify-between">
                <span>Croissant</span>
                <span className="font-semibold text-navy">$3.20</span>
              </li>
              <li className="flex justify-between border-t border-dashed border-navy/10 pt-2">
                <span>VAT (incl.)</span>
                <span className="font-semibold text-navy">$0.92</span>
              </li>
            </ul>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-primary-600 px-3 py-2 text-white">
              <span className="text-[11px] font-medium">Total</span>
              <span className="text-sm font-bold">$7.70</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating branch chip */}
      <div
        data-float="chip-a"
        className="absolute -left-4 top-16 hidden rounded-xl border border-navy/5 bg-white px-3 py-2 shadow-card sm:flex sm:items-center sm:gap-2"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-100 text-primary-700">
          <Store className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] text-navy/50">Branches online</p>
          <p className="text-xs font-bold text-navy">6 / 6</p>
        </div>
      </div>

      {/* Floating receipt chip */}
      <div
        data-float="chip-b"
        className="absolute -bottom-5 right-2 hidden rounded-xl border border-navy/5 bg-white px-3 py-2 shadow-card sm:flex sm:items-center sm:gap-2"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
          <Receipt className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] text-navy/50">Receipt printed</p>
          <p className="text-xs font-bold text-navy">ESC/POS ✓</p>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-xl border border-navy/5 bg-white p-3 shadow-soft">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-100 text-primary-700">
        {icon}
      </span>
      <p className="mt-2 text-[10px] font-medium text-navy/50">{label}</p>
      <p className="text-base font-bold text-navy">{value}</p>
      <p className="text-[10px] font-semibold text-emerald-600">{trend}</p>
    </div>
  );
}
