/**
 * Feature catalog rendered in the Features section as a bento layout.
 *
 * Layout hints (consumed by components/Features.tsx):
 *   - `featured`  → large 2×2 spotlight card (dark) with a mini visual
 *   - `wide`      → spans two columns; pairs text with a mini visual
 *   - `visual`    → which inline mini-graphic to render on featured/wide cards
 *   - `category`  → short group label shown as an eyebrow on each card
 *
 * The default order is tuned so the bento tiles cleanly on a 4-column grid.
 */
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  LineChart,
  Gift,
  ShoppingCart,
  Percent,
  Printer,
  Wallet,
  KeyRound,
  ShieldCheck,
  MonitorSmartphone,
  Layers,
} from "lucide-react";

export type FeatureVisual = "branches" | "chart" | "devices" | "receipt";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  wide?: boolean;
  visual?: FeatureVisual;
}

export const features: Feature[] = [
  {
    icon: Building2,
    title: "Multi-branch management",
    description:
      "Run every location from one cockpit branch-level access control and branch-aware reporting keep each store accountable.",
    category: "Operate",
    featured: true,
    visual: "branches",
  },
  {
    icon: LineChart,
    title: "Finance & money management",
    description:
      "Expenses, profit & loss and cash flow with live dashboard KPIs you can act on.",
    category: "Operate",
    wide: true,
    visual: "chart",
  },
  {
    icon: Gift,
    title: "Loyalty points",
    description:
      "Configurable earn rates and post-tax redemption that bring customers back.",
    category: "Grow",
  },
  {
    icon: ShoppingCart,
    title: "Flexible checkout",
    description:
      "Bill catalog products or add custom off-catalog line items on the fly.",
    category: "Sell",
  },
  {
    icon: Percent,
    title: "VAT / tax handling",
    description:
      "Per-tenant tax modes including VAT-inclusive pricing, extracted correctly on every sale.",
    category: "Sell",
    wide: true,
    visual: "receipt",
  },
  {
    icon: Printer,
    title: "Thermal receipt printing",
    description: "Native ESC/POS support for crisp, instant receipts.",
    category: "Sell",
  },
  {
    icon: Wallet,
    title: "Cash session management",
    description: "Open and close drawers with full session tracking.",
    category: "Operate",
  },
  {
    icon: KeyRound,
    title: "Staff login & PIN",
    description: "Fast PIN identity with per-user roles and permissions.",
    category: "Secure",
  },
  {
    icon: ShieldCheck,
    title: "Account recovery",
    description: "Admin-mediated recovery and forced first-login password change.",
    category: "Secure",
  },
  {
    icon: MonitorSmartphone,
    title: "Cloud + Desktop",
    description:
      "Run in the browser or as a native Windows app your data stays synced in the cloud.",
    category: "Platform",
    wide: true,
    visual: "devices",
  },
  {
    icon: Layers,
    title: "Multi-tenant SaaS",
    description: "Isolated data per business with plan-tier feature gating.",
    category: "Platform",
  },
];
