import { Reveal } from "../reveal";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

const etapes = [
  {
    num: "01.",
    titre: "Échangeons",
    texte: "Nous découvrons votre situation, vos envies et les contours de votre projet.",
  },
  {
    num: "02.",
    titre: "Formez-vous",
    texte: "Vous développez des compétences métier dans un cadre structuré et humain.",
  },
  {
    num: "03.",
    titre: "Construisez la suite",
    texte: "Vous abordez votre prochaine étape avec des repères et des outils adaptés.",
  },
];

export function Process() {
  return (
    <section id="parcours" className="overflow-hidden bg-dark py-[85px] text-white lg:py-[145px]">
      <div className="container-site">
        <Reveal className="mb-10 grid grid-cols-1 gap-5 lg:mb-[85px] lg:grid-cols-[1.1fr_1fr] lg:gap-[10%]">
          <div>
            <Eyebrow className="text-[#c7b394]">03   /   Un parcours clair</Eyebrow>
            <SectionTitle className="mb-0">
              Chaque vocation
              <br />
              mérite un <i>élan.</i>
            </SectionTitle>
          </div>
          <p className="max-w-[520px] text-[14px] leading-[2] text-[#c0c8c0] lg:pt-[35px]">
            De la première conversation à votre projet d&apos;activité, nous avançons avec méthode,
            attention et un objectif : vous donner les moyens d&apos;agir.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 border-t border-[#53675a] md:grid-cols-3">
          {etapes.map((e, i) => (
            <Reveal
              key={e.num}
              className={`min-h-[210px] pr-[45px] pt-[35px] ${
                i < etapes.length - 1 ? "md:border-r md:border-[#53675a]" : ""
              } ${i > 0 ? "md:pl-[42px]" : ""}`}
            >
              <div className="font-serif text-[50px] text-[#bfae92]">{e.num}</div>
              <h3 className="mb-[10px] mt-[15px] font-serif text-[29px] font-normal">{e.titre}</h3>
              <p className="text-[12px] leading-[1.9] text-[#c0c8c0]">{e.texte}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
