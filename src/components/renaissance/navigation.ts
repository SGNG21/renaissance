/** Navigation du site, alignée sur l'arborescence du cahier technique (section 4). */
export const mainNav = [
  { label: "Les formations", href: "/formations" },
  { label: "Le programme", href: "/programme" },
  { label: "L'immersion", href: "/immersion" },
  { label: "Public visé", href: "/public-vise" },
  { label: "Infos pratiques", href: "/informations-pratiques" },
] as const;

export const footerNav = {
  explorer: mainNav,
  accompagner: [
    { label: "Préinscription", href: "/preinscription" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
} as const;
