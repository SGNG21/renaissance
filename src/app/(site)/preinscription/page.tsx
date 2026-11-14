import type { Metadata } from "next";
import { Suspense } from "react";
import { FormulairePreinscription } from "@/components/renaissance/formulaire-preinscription";
import { PageHeader } from "@/components/renaissance/page-header";
import { Reveal } from "@/components/renaissance/reveal";

export const metadata: Metadata = {
  title: "Préinscription",
  description:
    "Préinscrivez-vous aux formations Renaissance : accueil familial, animation et vie sociale, dame de compagnie.",
};

export default function PreinscriptionPage() {
  const cleTurnstile = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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
        <div className="container-site grid grid-cols-1 items-start gap-[55px] lg:grid-cols-2 lg:gap-[12%]">
          <Reveal>
            <p className="max-w-[520px] text-[14px] leading-[2] text-sage">
              Après votre envoi, nous revenons vers vous pour échanger sur votre situation, vos
              envies et les contours de votre projet. Aucune inscription définitive n&apos;est
              engagée à ce stade.
            </p>
            <div className="mt-8 text-[11px] leading-[1.8] tracking-[0.03em]">
              <strong>Renaissance</strong>
              <br />
              Formations aux métiers de l&apos;accompagnement
              <br />
              <span>Informations et préinscriptions sur demande</span>
            </div>
          </Reveal>

          <Reveal>
            <Suspense fallback={null}>
              <FormulairePreinscription cleTurnstile={cleTurnstile} />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
