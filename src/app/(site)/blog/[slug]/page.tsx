import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { PageHeader } from "@/components/renaissance/page-header";
import { CATEGORIES_ARTICLE, getArticleBySlug, getArticles } from "@/lib/payload";
import { getSiteUrl } from "@/lib/site";
import { ArrowLink } from "@/ui/arrow-link";

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const titre = article.seo?.titre ?? article.titre;
  const description = article.seo?.description ?? article.chapo;

  return {
    title: titre,
    description,
    alternates: { canonical: `${getSiteUrl()}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: titre,
      description,
      url: `${getSiteUrl()}/blog/${slug}`,
      publishedTime: article.datePublication,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.chapo,
    datePublished: article.datePublication,
    author: { "@type": "Organization", name: "Renaissance" },
    publisher: { "@type": "Organization", name: "Renaissance" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      <PageHeader
        eyebrow={CATEGORIES_ARTICLE[article.categorie] ?? article.categorie}
        titre={article.titre}
        chapo={article.chapo}
      />

      <article className="container-site py-[60px] lg:py-[100px]">
        {article.image?.url ? (
          <div className="relative mb-12 h-[320px] bg-[#d9d8d0] lg:h-[460px]">
            <Image
              src={article.image.url}
              alt={article.image.alt ?? ""}
              fill
              sizes="100vw"
              className="object-cover saturate-[.68]"
              priority
            />
          </div>
        ) : null}

        <div className="max-w-[720px] text-[15px] leading-[1.95] text-ink [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-[32px] [&_h2]:font-normal [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-[24px] [&_li]:mb-2 [&_li]:list-disc [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:pl-5">
          {article.contenu ? (
            <RichText data={article.contenu as SerializedEditorState} />
          ) : null}
        </div>

        <div className="mt-16">
          <ArrowLink href="/blog">Tous les articles</ArrowLink>
        </div>
      </article>
    </main>
  );
}
