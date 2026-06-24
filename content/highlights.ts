/**
 * "Why Lumora" highlights strip — value props / stats shown above the footer.
 */
import type { LucideIcon } from "lucide-react";
import { CloudCog, Store, MonitorDown, Lock } from "lucide-react";

export interface Highlight {
  icon: LucideIcon;
  /** Big stat or short value statement. */
  stat: string;
  label: string;
}

export const highlights: Highlight[] = [
  {
    icon: MonitorDown,
    stat: "Desktop-ready",
    label: "Native Windows app for fast, reliable counter performance.",
  },
  {
    icon: Store,
    stat: "Retail & hospitality",
    label: "Purpose-built for shops, cafés, restaurants and multi-branch chains.",
  },
  {
    icon: CloudCog,
    stat: "Cloud-synced",
    label: "Your sales, stock and reports stay in sync across every device.",
  },
  {
    icon: Lock,
    stat: "Tenant-isolated",
    label: "Bank-grade multi-tenant separation keeps each business's data private.",
  },
];
