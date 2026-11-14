"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/ui/button";

const CLE = "renaissance.consentement-mesure";

/**
 * Bannière de consentement aux cookies de mesure d'audience.
 *
 * IMPORTANT : elle n'est affichée que si un outil de mesure est réellement
 * configuré (voir le layout). Tant que le site ne dépose aucun traceur,
 * afficher une bannière serait trompeur et inutile — le consentement n'est
 * exigé que pour les cookies non essentiels.
 *
 * Le choix est conservé en localStorage ; aucun traceur n'est chargé tant que
 * le consentement n'est pas explicite.
 */
const abonnes = new Set<() => void>();

function sAbonner(rappel: () => void) {
  abonnes.add(rappel);
  return () => abonnes.delete(rappel);
}

function lireChoix(): string | null {
  try {
    return window.localStorage.getItem(CLE);
  } catch {
    // localStorage indisponible : on considère qu'un choix existe déjà pour
    // ne pas afficher une bannière dont le résultat ne serait pas conservé.
    return "indisponible";
  }
}

/** Rendu serveur : aucun choix lisible, donc aucune bannière. */
function choixServeur(): string {
  return "serveur";
}

export function BanniereCookies() {
  const choix = React.useSyncExternalStore(sAbonner, lireChoix, choixServeur);

  function repondre(valeur: "accepte" | "refuse") {
    try {
      window.localStorage.setItem(CLE, valeur);
    } catch {
      // Ignoré : le refus reste l'état par défaut.
    }
    for (const rappel of abonnes) rappel();
  }

  if (choix !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement à la mesure d'audience"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper p-6 md:p-8"
    >
      <div className="container-site flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[640px] text-[13px] leading-[1.9] text-sage">
          Nous souhaitons mesurer l&apos;audience de ce site pour l&apos;améliorer. Aucun traceur
          n&apos;est déposé sans votre accord.{" "}
          <Link href="/confidentialite" className="underline">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex flex-none gap-3">
          <Button variant="outline" onClick={() => repondre("refuse")}>
            Refuser
          </Button>
          <Button onClick={() => repondre("accepte")}>Accepter</Button>
        </div>
      </div>
    </div>
  );
}

/** Lecture du consentement, pour conditionner le chargement d'un traceur. */
export function consentementMesureAccorde(): boolean {
  try {
    return window.localStorage.getItem(CLE) === "accepte";
  } catch {
    return false;
  }
}
