import { Logo } from "@/components/renaissance/logo";
import { ParcoursCard } from "@/components/renaissance/parcours-card";
import { ArrowLink } from "@/ui/arrow-link";
import { Button } from "@/ui/button";
import { Eyebrow } from "@/ui/eyebrow";
import { Field, FieldInput, FieldSelect } from "@/ui/field";
import { SectionTitle } from "@/ui/section-title";

const tokens = [
  ["ink", "bg-ink"],
  ["dark", "bg-dark"],
  ["forest", "bg-forest"],
  ["forest-hover", "bg-forest-hover"],
  ["gold", "bg-gold"],
  ["gold-light", "bg-gold-light"],
  ["ivory", "bg-ivory"],
  ["paper", "bg-paper border border-line"],
  ["line", "bg-line"],
  ["sage", "bg-sage"],
] as const;

/** Page provisoire (point 1) : validation du design system sur Vercel. Remplacée au point 5. */
export default function Home() {
  return (
    <main>
      <header className="border-b border-line py-6">
        <div className="container-site">
          <Logo />
        </div>
      </header>

      <section className="container-site py-24">
        <Eyebrow>Design system / Étape 1</Eyebrow>
        <SectionTitle as="h1">Le sens de prendre soin.</SectionTitle>
        <p className="max-w-[520px] text-[14px] leading-[2] text-sage">
          Page provisoire de validation des tokens et composants. Elle sera remplacée par l&apos;accueil
          au point 5 de la construction.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button>Construisons votre avenir</Button>
          <Button variant="outline">Découvrir</Button>
          <ArrowLink href="/">Découvrir nos formations</ArrowLink>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-site">
          <Eyebrow>Palette</Eyebrow>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {tokens.map(([name, cls]) => (
              <li key={name}>
                <div className={`h-20 ${cls}`} />
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em]">{name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-24">
        <Eyebrow>Parcours</Eyebrow>
        <div className="mt-8 grid gap-[19px] md:grid-cols-3">
          <ParcoursCard
            number="01"
            type="Accompagnement & accueil"
            title="Accueil familial"
            description="Accueillir, accompagner et créer un cadre de vie rassurant."
            href="/preinscription"
            image={{
              src: "/images/placeholders/maquette-2.webp",
              alt: "Illustration générée par IA (placeholder)",
            }}
          />
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-site max-w-[640px]">
          <Eyebrow>Champs de formulaire</Eyebrow>
          <div className="mt-8 bg-paper p-12">
            <Field label="Prénom *" htmlFor="demo-prenom">
              <FieldInput id="demo-prenom" />
            </Field>
            <Field label="La formation qui vous intéresse *" htmlFor="demo-formation">
              <FieldSelect id="demo-formation" defaultValue="">
                <option value="" disabled>
                  Choisir une formation
                </option>
              </FieldSelect>
            </Field>
          </div>
        </div>
      </section>
    </main>
  );
}
