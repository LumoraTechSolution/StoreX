import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Highlights } from "@/components/Highlights";
import { ContactTeaser } from "@/components/ContactTeaser";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

/**
 * Single landing page with anchored sections (#features, #why, #contact)
 * plus the routed /contact page. Statically rendered at build time.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <Highlights />
        <ContactTeaser />
      </main>
      <Footer />

      {/* SEO: structured data for the software product. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: site.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Windows",
            description: site.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            publisher: { "@type": "Organization", name: site.company },
          }),
        }}
      />
    </>
  );
}
