import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "Le programme",
  description: "Le programme de formation Renaissance, d'une durée de 35 heures.",
};

export default function ProgrammePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Le programme"
        titre={
          <>
            Trente-cinq heures
            <br />
            pour <i>se préparer.</i>
          </>
        }
        chapo="Un programme de 35 heures, pensé pour articuler les savoirs du métier et la posture d'accompagnement."
      />

      <section className="container-site py-[85px] lg:py-[140px]">
        <ACompleter titre="Programme détaillé à fournir" className="max-w-[760px]">
          <p>
            Le découpage des 35 heures (modules, volumes horaires, intervenants, modalités
            d&apos;évaluation) doit être fourni par Renaissance.
          </p>
          <p className="mt-3">
            Aucun contenu pédagogique n&apos;est inventé ici : la page sera complétée dès réception
            du programme validé.
          </p>
        </ACompleter>
      </section>
    </main>
  );
}
