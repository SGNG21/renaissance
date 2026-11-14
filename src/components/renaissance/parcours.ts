/** Les trois parcours du cahier technique (section 6). */
export const parcours = [
  {
    number: "01",
    type: "Accompagnement & accueil",
    title: "Accueil familial",
    description: "Accueillir, accompagner et créer un cadre de vie rassurant.",
    value: "accueil-familial",
    image: {
      src: "/images/placeholders/maquette-3.webp",
      alt: "Professionnelle de l'accompagnement en interaction avec une personne",
    },
  },
  {
    number: "02",
    type: "Lien social & animation",
    title: "Animation & vie sociale",
    description: "Créer des moments qui comptent et nourrissent le lien.",
    value: "animation-vie-sociale",
    image: {
      src: "/images/placeholders/maquette-4.webp",
      alt: "Groupe réuni autour d'une activité collective",
    },
  },
  {
    number: "03",
    type: "Présence & quotidien",
    title: "Dame de compagnie",
    description: "Apporter une présence bienveillante au quotidien.",
    value: "dame-de-compagnie",
    image: {
      src: "/images/placeholders/maquette-5.webp",
      alt: "Professionnelle de santé en tenue claire",
    },
  },
] as const;
