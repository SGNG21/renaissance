import type { Metadata } from "next";
import { Italiana, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "Renaissance — Formations aux métiers de l'accompagnement",
  description:
    "Renaissance, maison de formation aux métiers de l'accompagnement dans l'Yonne (89).",
  // Site en construction : à retirer au point 8 (SEO technique) avant la mise en ligne.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${italiana.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
