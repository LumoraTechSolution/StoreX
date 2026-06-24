import Link from "next/link";
import { Linkedin, Facebook, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site, footerLinks, socials } from "@/content/site";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  LinkedIn: Linkedin,
};

export function Footer() {
  return (
    <footer className="border-t border-navy/5 bg-navy-dark text-white/80">
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Logo variant="light" showPoweredBy />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline} Built for retail and hospitality teams.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden /> {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {site.name}. {site.poweredBy}. All
            rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.label] ?? Facebook;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-primary-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
