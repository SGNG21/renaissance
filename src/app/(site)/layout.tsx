import type { Metadata } from "next";
import { Italiana, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/renaissance/site-footer";
import { SiteHeader } from "@/components/renaissance/site-header";
import { TopLine } from "@/components/renaissance/top-line";
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

export const metadata: Metadata = {
  title: {
    default: "Renaissance — Formations aux métiers de l'accompagnement",
    template: "%s | Renaissance",
  },
  description:
    "Renaissance, maison de formation aux métiers de l'accompagnement dans l'Yonne (89) : accueil familial, animation et vie sociale, dame de compagnie.",
  // Site en construction : à retirer au point 8 (SEO technique) avant la mise en ligne.
  robots: { index: false, follow: false },
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
        <TopLine />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
