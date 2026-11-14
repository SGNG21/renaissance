import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ACompleter } from "@/components/renaissance/a-completer";
import { PageHeader } from "@/components/renaissance/page-header";
import { Reveal } from "@/components/renaissance/reveal";
import { CATEGORIES_ARTICLE, getArticles } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Le journal",
  description:
    "Articles de Renaissance sur les métiers de l'accompagnement, la formation et les parcours de reconversion.",
};

function formaterDate(valeur: string) {
  return new Date(valeur).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <main>
      <PageHeader
        eyebrow="Le journal"
        titre={
          <>
            Comprendre
            <br />
            ces <i>métiers.</i>
          </>
        }
        chapo="Réflexions et repères sur les métiers de l'accompagnement, la formation et les parcours de reconversion."
      />

      <section className="container-site py-[85px] lg:py-[120px]">
        {articles.length === 0 ? (
          <ACompleter titre="Aucun article publié" className="max-w-[760px]">
            Les articles se rédigent depuis le back-office, rubrique Articles. Le premier
            article (1 000 à 1 500 mots) attend son sujet et sa validation éditoriale.
          </ACompleter>
        ) : (
          <div className="grid grid-cols-1 gap-[45px] md:grid-cols-3 md:gap-[19px]">
            {articles.map((article) => (
              <Reveal key={article.slug} as="article">
                <Link href={`/blog/${article.slug}`} className="group block">
                  <div className="relative h-[260px] overflow-hidden bg-[#d9d8d0]">
                    {article.image?.url ? (
                      <Image
                        src={article.image.url}
                        alt={article.image.alt ?? ""}
                        fill
                        sizes="(max-width: 750px) 100vw, 33vw"
                        className="object-cover saturate-[.68] transition-transform duration-[750ms] group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="pt-[27px]">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-gold-text">
                      {CATEGORIES_ARTICLE[article.categorie] ?? article.categorie}
                    </span>
                    <h2 className="mb-[10px] mt-3 font-serif text-[28px] font-normal leading-[1.15]">
                      {article.titre}
                    </h2>
                    <p className="text-[12px] leading-[1.85] text-[#777e76]">{article.chapo}</p>
                    <time
                      dateTime={article.datePublication}
                      className="mt-4 block text-[11px] text-sage"
                    >
                      {formaterDate(article.datePublication)}
                    </time>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
