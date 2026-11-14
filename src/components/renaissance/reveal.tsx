"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Apparition au défilement, reprise de la maquette (.reveal / .visible).
 *
 * L'état est porté par l'attribut data-visible et les styles vivent dans
 * globals.css : pas de state React, donc pas de rendu supplémentaire.
 * L'effet est désactivé si prefers-reduced-motion est actif, et un <noscript>
 * garantit la visibilité du contenu sans JavaScript.
 */
export function Reveal({
  className,
  as: Tag = "div",
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" }) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-visible", "");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} data-reveal="" className={cn(className)} {...props}>
      {children}
    </Tag>
  );
}
