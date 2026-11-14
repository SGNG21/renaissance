import { cn } from "@/lib/utils";

/**
 * Bloc signalant un contenu que le client doit fournir
 * (cahier technique, section 9 : tarifs, dates, lieux, programme, financements).
 *
 * Volontairement visible : aucune donnée n'est inventée. À retirer une fois le
 * contenu réel intégré.
 */
export function ACompleter({
  titre = "Contenu à compléter",
  children,
  className,
}: {
  titre?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn("border border-dashed border-gold bg-ivory p-6 md:p-8", className)}
      aria-label={titre}
    >
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#776651]">
        {titre}
      </p>
      <div className="text-[13px] leading-[1.9] text-sage">{children}</div>
    </aside>
  );
}
