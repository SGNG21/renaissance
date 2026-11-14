import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";
import { parcours } from "@/components/renaissance/parcours";
import { ParcoursCard } from "@/components/renaissance/parcours-card";
import { Reveal } from "@/components/renaissance/reveal";

export const metadata: Metadata = {
  title: "Les formations",
  description:
    "Les trois parcours de formation Renaissance : accueil familial, animation et vie sociale, dame de compagnie.",
};

export default function FormationsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Les parcours de formation"
        titre={
          <>
            Des métiers.
            <br />
            Des <i>destins.</i>
          </>
        }
        chapo="Trois parcours pour transformer une envie d'aider en compétences concrètes, au rythme de votre projet professionnel."
      />

      <section className="container-site py-[85px] lg:py-[140px]">
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

        <ACompleter titre="Détail des parcours à valider" className="mt-16 max-w-[760px]">
          Le contenu détaillé de chaque parcours (objectifs, compétences visées, durée, modalités
          d&apos;évaluation) doit être fourni et validé par Renaissance avant la mise en ligne.
        </ACompleter>
      </section>
    </main>
  );
}
