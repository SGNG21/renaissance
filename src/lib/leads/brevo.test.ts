import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ajouterContact } from "./brevo";
import type { DonneesPreinscription } from "./schema";

const lead = {
  prenom: "Camille",
  nom: "Durand",
  email: "camille.durand@example.fr",
  formationVisee: "accueil-familial",
  consentement: true,
} as DonneesPreinscription;

describe("ajouterContact", () => {
  const env = { ...process.env };

  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("Aucun appel réseau ne doit partir dans ces cas.");
      }),
    );
  });

  afterEach(() => {
    process.env = { ...env };
    vi.unstubAllGlobals();
  });

  it("saute l'ajout sans erreur quand aucune liste n'est configurée", async () => {
    delete process.env.BREVO_LIST_ID;
    const r = await ajouterContact(lead, "Accueil familial");

    expect(r.ok).toBe(true);
    expect(r.saute).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("saute aussi quand la variable est vide ou faite d'espaces", async () => {
    for (const valeur of ["", "   "]) {
      process.env.BREVO_LIST_ID = valeur;
      const r = await ajouterContact(lead, "Accueil familial");
      expect(r.saute).toBe(true);
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("signale un identifiant de liste invalide sans appeler Brevo", async () => {
    process.env.BREVO_LIST_ID = "liste-principale";
    const r = await ajouterContact(lead, "Accueil familial");

    expect(r.ok).toBe(false);
    expect(r.saute).toBeUndefined();
    expect(r.raison).toBe("liste-identifiant-invalide");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("n'appelle pas Brevo si la clé API est absente", async () => {
    process.env.BREVO_LIST_ID = "7";
    delete process.env.BREVO_API_KEY;
    const r = await ajouterContact(lead, "Accueil familial");

    expect(r.ok).toBe(false);
    expect(r.raison).toBe("cle-absente");
    expect(fetch).not.toHaveBeenCalled();
  });
});
