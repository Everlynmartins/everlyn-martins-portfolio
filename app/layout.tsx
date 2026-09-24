import type { Metadata } from "next";
import { siteMeta, socialLinks } from "./data/portfolio";
import "./globals.css";
import "./refinement.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://everlynmartins.github.io/everlyn-martins-portfolio"),
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: [
    "Everlyn Martins",
    "ciência de dados",
    "machine learning",
    "analytics",
    "inteligência artificial",
    "modelagem estatística",
    "Python",
    "SQL",
  ],
  authors: [{ name: siteMeta.name }],
  creator: siteMeta.name,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    type: "website",
    locale: "pt_BR",
    siteName: siteMeta.name,
    url: "https://everlynmartins.github.io/everlyn-martins-portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Everlyn Martins, Ciência de Dados, Analytics e Machine Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.name,
    jobTitle: "Cientista de Dados",
    url: "https://everlynmartins.github.io/everlyn-martins-portfolio",
    sameAs: [socialLinks.github, socialLinks.linkedin],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidade Federal de Santa Catarina" },
      { "@type": "CollegeOrUniversity", name: "Universidade Federal do Paraná" },
    ],
  };

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
