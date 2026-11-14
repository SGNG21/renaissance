import { parcours } from "../parcours";
import { ParcoursCard } from "../parcours-card";
import { Reveal } from "../reveal";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

export function Formations() {
  return (
    <section id="formations" className="container-site py-[85px] lg:py-[140px]">
      <Reveal className="mb-[58px] block items-end justify-between gap-[50px] md:flex">
        <div>
          <Eyebrow>02   /   Les parcours de formation</Eyebrow>
          <SectionTitle className="mb-0">
            Des métiers.
            <br />
            Des <i>destins.</i>
          </SectionTitle>
        </div>
        <p className="max-w-[345px] text-[13px] leading-[1.9] text-[#7a8178]">
          Des programmes conçus pour transformer une envie d&apos;aider en compétences concrètes,
          au rythme de votre projet professionnel.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[45px] md:grid-cols-3 md:gap-[19px]">
        {parcours.map((p) => (
          <Reveal key={p.value} as="div">
            <ParcoursCard
              number={p.number}
              type={p.type}
              title={p.title}
              description={p.description}
              href={`/preinscription?formation=${p.value}`}
              image={p.image}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
