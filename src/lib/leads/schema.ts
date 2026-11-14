import { z } from "zod";

/** Version du texte de consentement affiché. À incrémenter si le texte change. */
export const VERSION_CONSENTEMENT = "2026-11-v1";

export const TEXTE_CONSENTEMENT =
  "J'accepte que mes informations soient utilisées pour être recontacté(e) au sujet de ma demande.";

/** Les 3 parcours du cahier technique, plus « Autre ». Pas de FLE. */
export const FORMATIONS = [
  { valeur: "accueil-familial", libelle: "Accueil familial" },
  { valeur: "animation-vie-sociale", libelle: "Animation & vie sociale" },
  { valeur: "dame-de-compagnie", libelle: "Dame de compagnie" },
  { valeur: "autre", libelle: "Autre / je ne sais pas encore" },
] as const;

const valeursFormation = FORMATIONS.map((f) => f.valeur) as [string, ...string[]];

/**
 * Validation du formulaire de préinscription.
 * Appliquée CÔTÉ SERVEUR : le navigateur ne fait qu'un premier filtrage.
 */
export const schemaPreinscription = z.object({
  prenom: z.string().trim().min(1, "Le prénom est obligatoire.").max(80),
  nom: z.string().trim().min(1, "Le nom est obligatoire.").max(80),
  email: z.email("Adresse e-mail invalide.").max(180),
  telephone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+().\s-]*$/, "Numéro de téléphone invalide.")
    .optional()
    .or(z.literal("")),
  formationVisee: z.enum(valeursFormation, "Choisissez une formation."),
  zone: z.string().trim().max(120).optional().or(z.literal("")),
  disponibilites: z.string().trim().max(300).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  consentement: z.literal(true, "Votre consentement est nécessaire."),

  // Anti-spam : champ piège, invisible et jamais rempli par un humain.
  siteWeb: z.string().max(0, "Requête rejetée.").optional().or(z.literal("")),

  // Jeton Cloudflare Turnstile, vérifié côté serveur.
  turnstileToken: z.string().optional().or(z.literal("")),

  // Origine et campagne, renseignées par le client.
  source: z.string().max(200).optional().or(z.literal("")),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
      term: z.string().max(120).optional(),
      content: z.string().max(120).optional(),
    })
    .optional(),
});

export type DonneesPreinscription = z.infer<typeof schemaPreinscription>;
