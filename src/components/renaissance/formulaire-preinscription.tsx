"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { FORMATIONS, TEXTE_CONSENTEMENT } from "@/lib/leads/schema";
import { Button } from "@/ui/button";
import { Field, FieldInput, FieldSelect, FieldTextarea } from "@/ui/field";

type Erreurs = Record<string, string>;

export function FormulairePreinscription({ cleTurnstile }: { cleTurnstile?: string }) {
  const router = useRouter();
  const parametres = useSearchParams();
  const [envoi, setEnvoi] = React.useState(false);
  const [erreurs, setErreurs] = React.useState<Erreurs>({});
  const [erreurGenerale, setErreurGenerale] = React.useState<string | null>(null);

  const formationPrechoisie = parametres.get("formation") ?? "";
  const zonePrechoisie = parametres.get("zone") ?? "";

  async function soumettre(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setErreurs({});
    setErreurGenerale(null);
    setEnvoi(true);

    const formulaire = new FormData(evenement.currentTarget);

    const charge = {
      prenom: String(formulaire.get("prenom") ?? ""),
      nom: String(formulaire.get("nom") ?? ""),
      email: String(formulaire.get("email") ?? ""),
      telephone: String(formulaire.get("telephone") ?? ""),
      formationVisee: String(formulaire.get("formationVisee") ?? ""),
      zone: String(formulaire.get("zone") ?? ""),
      disponibilites: String(formulaire.get("disponibilites") ?? ""),
      message: String(formulaire.get("message") ?? ""),
      consentement: formulaire.get("consentement") === "on",
      siteWeb: String(formulaire.get("siteWeb") ?? ""),
      turnstileToken: String(formulaire.get("cf-turnstile-response") ?? ""),
      source: typeof window !== "undefined" ? window.location.pathname : undefined,
      utm: {
        source: parametres.get("utm_source") ?? undefined,
        medium: parametres.get("utm_medium") ?? undefined,
        campaign: parametres.get("utm_campaign") ?? undefined,
        term: parametres.get("utm_term") ?? undefined,
        content: parametres.get("utm_content") ?? undefined,
      },
    };

    try {
      const reponse = await fetch("/api/preinscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(charge),
      });

      if (reponse.ok) {
        router.push("/preinscription/merci");
        return;
      }

      const corps = (await reponse.json().catch(() => ({}))) as {
        erreur?: string;
        champs?: Erreurs;
      };
      if (corps.champs) setErreurs(corps.champs);
      setErreurGenerale(corps.erreur ?? "L'envoi a échoué. Merci de réessayer.");
    } catch {
      setErreurGenerale(
        "L'envoi a échoué, peut-être à cause de votre connexion. Merci de réessayer.",
      );
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={soumettre} noValidate className="bg-paper p-[25px] sm:p-[30px] lg:p-[47px]">
      <h2 className="mb-8 font-serif text-[36px] font-normal">Parlons de votre avenir.</h2>

      {erreurGenerale ? (
        <p role="alert" className="mb-6 border border-[#8a3b2e] p-4 text-[13px] text-[#8a3b2e]">
          {erreurGenerale}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-x-[22px] sm:grid-cols-2">
        <Field label="Prénom *" htmlFor="prenom" error={erreurs.prenom}>
          <FieldInput id="prenom" name="prenom" autoComplete="given-name" required />
        </Field>
        <Field label="Nom *" htmlFor="nom" error={erreurs.nom}>
          <FieldInput id="nom" name="nom" autoComplete="family-name" required />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-x-[22px] sm:grid-cols-2">
        <Field label="Adresse e-mail *" htmlFor="email" error={erreurs.email}>
          <FieldInput id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Téléphone" htmlFor="telephone" error={erreurs.telephone}>
          <FieldInput id="telephone" name="telephone" type="tel" autoComplete="tel" />
        </Field>
      </div>

      <Field
        label="La formation qui vous intéresse *"
        htmlFor="formationVisee"
        error={erreurs.formationVisee}
      >
        <FieldSelect
          id="formationVisee"
          name="formationVisee"
          defaultValue={formationPrechoisie}
          required
        >
          <option value="" disabled>
            Choisir une formation
          </option>
          {FORMATIONS.map((f) => (
            <option key={f.valeur} value={f.valeur}>
              {f.libelle}
            </option>
          ))}
        </FieldSelect>
      </Field>

      <Field label="Votre commune ou département" htmlFor="zone" error={erreurs.zone}>
        <FieldInput
          id="zone"
          name="zone"
          defaultValue={zonePrechoisie}
          placeholder="Par exemple : Sens, ou Yonne"
        />
      </Field>

      <Field label="Vos disponibilités" htmlFor="disponibilites" error={erreurs.disponibilites}>
        <FieldInput
          id="disponibilites"
          name="disponibilites"
          placeholder="Par exemple : en semaine, en journée"
        />
      </Field>

      <Field label="Votre projet" htmlFor="message" error={erreurs.message}>
        <FieldTextarea id="message" name="message" rows={4} />
      </Field>

      {/* Champ piège anti-robot : masqué et retiré du parcours clavier. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="siteWeb">Ne pas remplir</label>
        <input id="siteWeb" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mb-6 flex items-start gap-[10px] text-[10px] leading-[1.6] text-[#7a8078]">
        <input
          id="consentement"
          name="consentement"
          type="checkbox"
          required
          className="my-[3px] accent-forest"
        />
        <label htmlFor="consentement">
          {TEXTE_CONSENTEMENT} *{" "}
          <Link href="/confidentialite" className="underline">
            Politique de confidentialité
          </Link>
        </label>
      </div>
      {erreurs.consentement ? (
        <p role="alert" className="mb-4 text-[11px] text-[#8a3b2e]">
          {erreurs.consentement}
        </p>
      ) : null}

      {cleTurnstile ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
          />
          <div className="cf-turnstile mb-6" data-sitekey={cleTurnstile} data-language="fr" />
        </>
      ) : null}

      <Button type="submit" disabled={envoi}>
        {envoi ? "Envoi en cours…" : "Demander des informations"}
        <span aria-hidden>↗</span>
      </Button>
    </form>
  );
}
