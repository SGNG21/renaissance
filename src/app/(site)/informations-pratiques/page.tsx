import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "Informations pratiques",
  description:
    "Lieux, dates, tarifs et financements des formations Renaissance dans l'Yonne (89).",
};

const blocs = [
  { titre: "Lieux", detail: "Les lieux de formation doivent être confirmés par Renaissance." },
  { titre: "Dates", detail: "Le calendrier des prochaines sessions doit être fourni." },
  { titre: "Tarifs", detail: "Les tarifs et conditions de règlement doivent être fournis." },
  {
    titre: "Financements",
    detail: "Les dispositifs de financement mobilisables doivent être confirmés.",
  },
];

export default function InformationsPratiquesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Informations pratiques"
        titre={
          <>
            Tout ce qu&apos;il faut
            <br />
            savoir <i>avant de venir.</i>
          </>
        }
        chapo="Les lieux, modalités et dates des prochaines sessions sont communiqués lors de la prise de contact."
      />

      <section className="container-site py-[85px] lg:py-[140px]">
        <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
          {blocs.map((b) => (
            <div key={b.titre} className="bg-ivory p-[27px] md:px-[42px] md:py-9">
              <h2 className="font-serif text-[length:clamp(28px,3vw,40px)] font-normal text-forest">
                {b.titre}
              </h2>
              <p className="mt-3 text-[12px] leading-[1.9] text-sage">{b.detail}</p>
            </div>
          ))}
        </div>

        <ACompleter titre="Données à fournir avant mise en ligne" className="mt-16 max-w-[760px]">
          Tarifs, dates, lieux et financements figurent parmi les éléments à obtenir du client
          (cahier technique, section 9). Aucune valeur n&apos;est inventée sur cette page.
        </ACompleter>
      </section>
    </main>
  );
}
