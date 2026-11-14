import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "Public visé",
  description:
    "À qui s'adressent les formations Renaissance : profils, prérequis et conditions d'accès.",
};

export default function PublicVisePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Public visé"
        titre={
          <>
            Des parcours
            <br />
            <i>singuliers.</i>
          </>
        }
        chapo="Nous croyons aux secondes chances, aux parcours singuliers et aux vocations qui attendent le bon moment pour éclore."
      />

      <section className="container-site py-[85px] lg:py-[140px]">
        <div className="grid max-w-[900px] grid-cols-1 gap-[35px] border-t border-line pt-[35px] sm:grid-cols-2">
          <div>
            <b className="font-serif text-[26px] font-normal">Transmission</b>
            <p className="text-[12px] leading-[1.8] text-[#777e76]">
              Des compétences directement mobilisables sur le terrain.
            </p>
          </div>
          <div>
            <b className="font-serif text-[26px] font-normal">Proximité</b>
            <p className="text-[12px] leading-[1.8] text-[#777e76]">
              Une attention portée aux parcours et aux projets individuels.
            </p>
          </div>
        </div>

        <ACompleter titre="Profils et prérequis à fournir" className="mt-16 max-w-[760px]">
          Les profils visés, les prérequis et les conditions d&apos;accès (niveau, expérience,
          situation professionnelle) doivent être fournis et validés par Renaissance.
        </ACompleter>
      </section>
    </main>
  );
}
