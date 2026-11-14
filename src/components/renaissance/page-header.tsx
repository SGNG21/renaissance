import { Eyebrow } from "@/ui/eyebrow";
import { SectionTitle } from "@/ui/section-title";

/** En-tête commun aux pages intérieures, dans la charte de la maquette. */
export function PageHeader({
  eyebrow,
  titre,
  chapo,
}: {
  eyebrow: string;
  titre: React.ReactNode;
  chapo?: string;
}) {
  return (
    <section className="border-b border-line bg-paper py-[60px] lg:py-[100px]">
      <div className="container-site">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle as="h1" className="max-w-[900px]">
          {titre}
        </SectionTitle>
        {chapo ? (
          <p className="max-w-[560px] text-[14px] leading-[2] text-sage">{chapo}</p>
        ) : null}
      </div>
    </section>
  );
}
