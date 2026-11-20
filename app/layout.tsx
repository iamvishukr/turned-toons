import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CONTACT, FAQS, SITE, WORKS } from "@/lib/site";

const title = "TurnedToons — Custom Cartoon Portraits from Your Photos | Phoenix, AZ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | TurnedToons" },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Art & Illustration",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: true, address: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffd23f",
  width: "device-width",
  initialScale: 1,
};

const abs = (p: string) => `${SITE.url}/${p}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#business` },
    },
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      logo: abs("logo.png"),
      image: abs("opengraph-image.jpg"),
      description: SITE.description,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.city,
        addressRegion: CONTACT.address.region,
        postalCode: CONTACT.address.postalCode,
        addressCountry: CONTACT.address.country,
      },
      areaServed: [{ "@type": "City", name: "Phoenix" }, { "@type": "State", name: "Arizona" }, { "@type": "Country", name: "United States" }, "Worldwide"],
      sameAs: [CONTACT.instagram, CONTACT.facebook],
      contactPoint: [
        { "@type": "ContactPoint", contactType: "customer service", email: CONTACT.email, availableLanguage: ["English"] },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Custom cartoon portraits",
        itemListElement: ["Solo cartoon portrait", "Couple cartoon portrait", "Family cartoon portrait", "Pet cartoon portrait", "Custom fan-world cartoon scene"].map((n) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: n },
        })),
      },
    },
    {
      "@type": "ImageGallery",
      "@id": `${SITE.url}/#gallery`,
      name: "TurnedToons portfolio",
      url: `${SITE.url}/#gallery`,
      associatedMedia: WORKS.map((w) => ({
        "@type": "ImageObject",
        name: w.title,
        description: w.alt,
        contentUrl: abs(`works/${w.toon}.webp`),
        thumbnailUrl: abs(`works/${w.toon}-sm.webp`),
        width: w.w,
        height: w.h,
        creator: { "@id": `${SITE.url}/#business` },
        copyrightHolder: { "@id": `${SITE.url}/#business` },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="works/critter-crew-toon.webp" type="image/webp" />
        <link rel="preload" as="image" href="logo.webp" type="image/webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
