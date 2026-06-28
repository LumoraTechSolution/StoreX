import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Clock, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { site, whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Book a Demo",
  description:
    "Get in touch with the StoreX team. Book a personalized demo or ask us anything about our cloud + desktop point-of-sale platform.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-gradient-to-b from-primary-50/60 to-white pt-28 pb-20 sm:pt-32">
        <div className="container-px">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
          </Link>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            {/* Intro + contact details */}
            <div>
              <span className="eyebrow">Let&apos;s talk</span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Book a demo or ask us anything
              </h1>
              <p className="mt-4 max-w-md text-lg text-navy/70">
                Tell us about your business and we&apos;ll tailor a walkthrough
                of StoreX to your retail or hospitality workflow.
              </p>

              <ul className="mt-10 space-y-5">
                <ContactDetail
                  icon={<MessageCircle className="h-5 w-5" />}
                  label="WhatsApp"
                  value={site.phone}
                  href={whatsappUrl()}
                />
                <ContactDetail
                  icon={<Clock className="h-5 w-5" />}
                  label="Response time"
                  value="Within one business day"
                />
                <ContactDetail
                  icon={<MapPin className="h-5 w-5" />}
                  label="Built by"
                  value={site.company}
                />
              </ul>
            </div>

            {/* Form card */}
            <div className="rounded-3xl border border-navy/5 bg-white p-6 shadow-card sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-medium uppercase tracking-wide text-navy/45">
          {label}
        </span>
        <span className="block font-semibold text-navy">{value}</span>
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
          {body}
        </a>
      ) : (
        <div className="flex items-center gap-4">{body}</div>
      )}
    </li>
  );
}
