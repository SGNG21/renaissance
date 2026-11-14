import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "La journée d'immersion",
  description:
    "La journée d'immersion et le stage proposés dans le parcours de formation Renaissance.",
};

export default function ImmersionPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Immersion & stage"
        titre={
          <>
            Voir le métier
            <br />
            <i>de près.</i>
          </>
        }
        chapo="Une journée d'immersion et un stage pour confronter le projet à la réalité du terrain."
      />

      <section className="container-site py-[85px] lg:py-[140px]">
        <ACompleter titre="Modalités à fournir" className="max-w-[760px]">
          Le déroulé de la journée d&apos;immersion et les conditions du stage (durée, lieux,
          encadrement, conventions) doivent être fournis et validés par Renaissance.
        </ACompleter>
      </section>
    </main>
  );
}
