import { describe, expect, it } from "vitest";
import { schemaPreinscription } from "./schema";

const valide = {
  prenom: "Camille",
  nom: "Durand",
  email: "camille.durand@example.fr",
  formationVisee: "accueil-familial",
  consentement: true as const,
};

describe("schemaPreinscription", () => {
  it("accepte une demande minimale valide", () => {
    expect(schemaPreinscription.safeParse(valide).success).toBe(true);
  });

  it("refuse une demande sans consentement", () => {
    const r = schemaPreinscription.safeParse({ ...valide, consentement: false });
    expect(r.success).toBe(false);
  });

  it("refuse une adresse e-mail invalide", () => {
    const r = schemaPreinscription.safeParse({ ...valide, email: "pas-un-email" });
    expect(r.success).toBe(false);
  });

  it("refuse une formation hors des quatre choix (pas de FLE)", () => {
    const r = schemaPreinscription.safeParse({ ...valide, formationVisee: "fle" });
    expect(r.success).toBe(false);
  });

  it("accepte les trois parcours et « autre »", () => {
    for (const v of [
      "accueil-familial",
      "animation-vie-sociale",
      "dame-de-compagnie",
      "autre",
    ]) {
      expect(schemaPreinscription.safeParse({ ...valide, formationVisee: v }).success).toBe(
        true,
      );
    }
  });

  it("refuse un champ piège rempli", () => {
    const r = schemaPreinscription.safeParse({ ...valide, siteWeb: "http://spam.example" });
    expect(r.success).toBe(false);
  });

  it("refuse un téléphone contenant des lettres", () => {
    const r = schemaPreinscription.safeParse({ ...valide, telephone: "06AB" });
    expect(r.success).toBe(false);
  });

  it("nettoie les espaces autour des champs texte", () => {
    const r = schemaPreinscription.safeParse({ ...valide, prenom: "  Camille  " });
    expect(r.success && r.data.prenom).toBe("Camille");
  });
});
