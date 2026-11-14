import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

/**
 * Titre de section de la charte (maquette : .sectiontitle).
 *
 * `leading` est volontairement appliqué APRÈS `className` : tailwind-merge
 * considère qu'une taille de police arbitraire peut porter la hauteur de ligne
 * et supprimerait sinon l'interlignage serré propre à la charte.
 */
export function SectionTitle({ as: Tag = "h2", className, ...props }: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "my-6 font-serif text-[length:clamp(42px,5.2vw,86px)] font-normal tracking-[-0.025em]",
        className,
        "leading-[0.99]",
      )}
      {...props}
    />
  );
}
