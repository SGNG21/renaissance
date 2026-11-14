import type { Metadata } from "next";
import { Italiana, Manrope } from "next/font/google";
import { BanniereCookies } from "@/components/renaissance/banniere-cookies";
import { DonneesStructurees } from "@/components/renaissance/donnees-structurees";
import { SiteFooter } from "@/components/renaissance/site-footer";
import { SiteHeader } from "@/components/renaissance/site-header";
import { TopLine } from "@/components/renaissance/top-line";
import { getSiteUrl, isIndexable } from "@/lib/site";
import "../globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const DESCRIPTION =
  "Renaissance, maison de formation aux métiers de l'accompagnement dans l'Yonne (89) : accueil familial, animation et vie sociale, dame de compagnie.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Renaissance — Formations aux métiers de l'accompagnement",
    template: "%s | Renaissance",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Renaissance",
    title: "Renaissance — Formations aux métiers de l'accompagnement",
    description: DESCRIPTION,
    url: getSiteUrl(),
  },
  // Indexation désactivée tant que SITE_INDEXABLE n'est pas à "true" :
  // le site ne doit pas être référencé avant sa mise en ligne.
  robots: isIndexable()
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${italiana.variable} ${manrope.variable}`}>
      <head>
        {/* Sans JavaScript, le contenu animé doit rester visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <DonneesStructurees />
        <TopLine />
        <SiteHeader />
        {children}
        <SiteFooter />
        {/*
          Bannière affichée uniquement si un outil de mesure est configuré.
          Sans traceur déposé, le consentement n'est pas requis et la bannière
          serait un faux signal pour le visiteur.
        */}
        {process.env.ANALYTICS_PROVIDER ? <BanniereCookies /> : null}
      </body>
    </html>
  );
}
