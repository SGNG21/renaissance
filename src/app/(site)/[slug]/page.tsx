import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";
import { parcours } from "@/components/renaissance/parcours";
import { ParcoursCard } from "@/components/renaissance/parcours-card";
import { Reveal } from "@/components/renaissance/reveal";
import { getZoneSeoBySlug, getZonesSeo } from "@/lib/payload";
import { getSiteUrl } from "@/lib/site";
import { ArrowLink } from "@/ui/arrow-link";
import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

/** Les URL des zones sont de la forme /formation-<slug> (cahier, section 4). */
const PREFIXE = "formation-";

/** Seules les zones de la collection existent : tout autre chemin renvoie 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const zones = await getZonesSeo();
  return zones.map((zone) => ({ slug: `${PREFIXE}${zone.slug}` }));
}

async function chargerZone(slug: string) {
  if (!slug.startsWith(PREFIXE)) return null;
  return getZoneSeoBySlug(slug.slice(PREFIXE.length));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const zone = await chargerZone(slug);
  if (!zone) return {};

  const titre = zone.seo?.titre ?? zone.titreH1;

  return {
    // `absolute` : le titre saisi dans le CMS est complet, le gabarit du layout
    // ne doit pas lui ajouter un second « | Renaissance ».
    title: { absolute: titre },
    description: zone.seo?.description ?? zone.introduction.slice(0, 160),
    alternates: { canonical: `${getSiteUrl()}/${slug}` },
    openGraph: {
      title: titre,
      description: zone.seo?.description ?? zone.introduction.slice(0, 160),
      url: `${getSiteUrl()}/${slug}`,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function ZoneSeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zone = await chargerZone(slug);
  if (!zone) notFound();

  const autresZones = (await getZonesSeo()).filter((z) => z.slug !== zone.slug);
  const faq = zone.faq ?? [];

  const donneesFaq =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: { "@type": "Answer", text: q.reponse },
          })),
        }
      : null;

  return (
    <main>
      {donneesFaq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesFaq) }}
        />
      ) : null}

      <PageHeader
        eyebrow={`Formation dans l'Yonne · ${zone.nom}`}
        titre={zone.titreH1}
        chapo={zone.introduction}
      />

      <section className="container-site py-[85px] lg:py-[120px]">
        <Eyebrow>Les parcours proposés</Eyebrow>
        <SectionTitle className="mb-12">
          Trois métiers,
          <br />
          une même <i>exigence.</i>
        </SectionTitle>
        <div className="grid grid-cols-1 gap-[45px] md:grid-cols-3 md:gap-[19px]">
          {parcours.map((p) => (
            <Reveal key={p.value} as="div">
              <ParcoursCard
                number={p.number}
                type={p.type}
                title={p.title}
                description={p.description}
                href={`/preinscription?formation=${p.value}&zone=${zone.slug}`}
                image={p.image}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {faq.length > 0 ? (
        <section className="bg-ivory py-[85px] lg:py-[120px]">
          <div className="container-site max-w-[860px]">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <SectionTitle className="mb-10">Vos questions, {zone.nom}.</SectionTitle>
            <dl>
              {faq.map((q) => (
                <div key={q.question} className="border-t border-line py-7">
                  <dt className="font-serif text-[26px] font-normal">{q.question}</dt>
                  <dd className="mt-3 text-[14px] leading-[2] text-sage">{q.reponse}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : (
        <section className="bg-ivory py-[85px] lg:py-[120px]">
          <div className="container-site">
            <ACompleter titre="FAQ à rédiger avec Renaissance" className="max-w-[760px]">
              Les questions fréquentes de cette zone restent à écrire : leurs réponses engagent
              l&apos;organisme (accès, financement, déroulé) et doivent être validées. Elles
              s&apos;ajoutent depuis le back-office, rubrique Zones SEO.
            </ACompleter>
          </div>
        </section>
      )}

      <section className="container-site py-[85px] lg:py-[120px]">
        <Eyebrow>Autres secteurs</Eyebrow>
        <SectionTitle className="mb-10">Se former ailleurs dans l&apos;Yonne.</SectionTitle>
        <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2">
          {autresZones.map((z) => (
            <Link
              key={z.slug}
              href={`/${PREFIXE}${z.slug}`}
              className="flex min-h-[150px] flex-col justify-between bg-ivory p-[27px] transition-[background,transform] duration-300 hover:-translate-y-[3px] hover:bg-[#dfdbce] md:px-[42px] md:py-9"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#776651]">
                {z.nom}
              </span>
              <strong className="font-serif text-[clamp(24px,2.5vw,34px)] font-normal leading-[1.12] text-forest">
                {z.titreH1}
              </strong>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          <ArrowLink href="/formations">Voir les trois parcours</ArrowLink>
          <ArrowLink href="/informations-pratiques">Informations pratiques</ArrowLink>
          <ArrowLink href="/preinscription">Se préinscrire</ArrowLink>
        </div>
      </section>
    </main>
  );
}
