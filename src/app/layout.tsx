import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { company, siteUrl } from "@/data/company";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Construção e Manutenção de Piscinas em Luís Eduardo Magalhães`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Construção e manutenção de piscinas em Luís Eduardo Magalhães - BA. Projetos sob medida, cuidado contínuo e atendimento próximo com a Martins Piscinas Aguazul LEM.",
  keywords: [
    "piscinas em Luís Eduardo Magalhães",
    "construção de piscinas em Luís Eduardo Magalhães",
    "manutenção de piscinas em Luís Eduardo Magalhães",
    "Martins Piscinas Aguazul LEM",
    "piscineiro LEM",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} | Construção e Manutenção de Piscinas`,
    description:
      "Construção e manutenção de piscinas em Luís Eduardo Magalhães - BA, com cuidado, qualidade e atenção aos detalhes.",
    images: [
      {
        url: "/images/pool-sunset-building.jpg",
        width: 2000,
        height: 1333,
        alt: company.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Construção e Manutenção de Piscinas`,
    description:
      "Construção e manutenção de piscinas em Luís Eduardo Magalhães - BA.",
    images: ["/images/pool-sunset-building.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  image: `${siteUrl}/logo.jpg`,
  telephone: `+${company.phoneE164}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${company.address.street} – ${company.address.complement}`,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "BR",
  },
  url: siteUrl,
  sameAs: [company.instagram.url],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
      </body>
    </html>
  );
}
