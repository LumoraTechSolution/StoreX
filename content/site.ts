/**
 * Global site configuration — name, URLs, nav, CTAs, contact details.
 * Edit copy here; components read from this single source of truth.
 */

export const site = {
  name: "StoreX",
  company: "Lumora Technologies",
  poweredBy: "Powered by Lumora Technologies",
  // Used for absolute URLs (metadata, OG, sitemap). Override via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://storex.example.com",
  tagline: "The point-of-sale built for modern retail & hospitality.",
  description:
    "StoreX is a cloud + desktop point-of-sale platform with multi-branch management, finance dashboards, loyalty, VAT handling, thermal receipts and secure multi-tenant data — for retail and hospitality teams.",
  phone: "+94 77 319 0068",
  // Same number as `phone`, in international format with digits only (no +,
  // spaces or dashes) — required by the wa.me click-to-chat API.
  whatsapp: "94773190068",
} as const;

/**
 * Builds a WhatsApp click-to-chat URL to the site's number, with an optional
 * prefilled message. Used by the "Book a Demo" CTAs.
 */
export function whatsappUrl(
  message = "Hi StoreX team, I'd like to book a demo of StoreX."
): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Primary navigation — anchor links scroll within the landing page. */
export const navLinks: { label: string; href: string }[] = [
  { label: "Features", href: "/#features" },
  { label: "Why StoreX", href: "/#why" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Why StoreX", href: "/#why" },
      { label: "Cloud + Desktop", href: "/#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Book a Demo", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Get Started", href: "/contact" },
      { label: "Support", href: "/contact" },
    ],
  },
];

export const socials: { label: string; href: string }[] = [
  { label: "Facebook", href: "https://www.facebook.com/share/1Ha3ii83A9/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/lumora-tech-solutions/",
  },
];
