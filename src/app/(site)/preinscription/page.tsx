import type { Metadata } from "next";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";

export const metadata: Metadata = {
  title: "Préinscription",
  description:
    "Préinscrivez-vous aux formations Renaissance : accueil familial, animation et vie sociale, dame de compagnie.",
};

export default function PreinscriptionPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Votre nouvelle étape"
        titre={
          <>
            Et si tout commençait
            <br />
            <i>aujourd&apos;hui ?</i>
          </>
        }
        chapo="Racontez-nous votre projet. Nous pourrons vous orienter vers le parcours qui correspond à vos envies et à votre situation."
      />

      <section className="bg-ivory py-[85px] lg:py-[140px]">
        <div className="container-site">
          <ACompleter titre="Formulaire en cours de construction" className="max-w-[760px]">
            <p>
              Le formulaire de préinscription est développé au point 7 du cahier technique :
              validation Zod côté serveur, anti-spam Turnstile, écriture du lead via une route
              serveur, puis webhook n8n et emails Brevo.
            </p>
            <p className="mt-3">
              Aucun formulaire factice n&apos;est affiché ici : il serait trompeur de recueillir
              des coordonnées qui ne seraient pas transmises.
            </p>
          </ACompleter>
        </div>
      </section>
    </main>
  );
}
