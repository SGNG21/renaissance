import { parcours } from "./parcours";
import { getSiteUrl, ORGANISATION } from "@/lib/site";

/**
 * Données structurées schema.org (cahier technique, section 7) :
 * EducationalOrganization « Renaissance » et un Course par parcours.
 *
 * Volontairement limité aux faits connus : aucun tarif, aucune date, aucune
 * certification n'est déclaré tant que le client ne les a pas fournis.
 */
export function DonneesStructurees() {
  const base = getSiteUrl();

  const organisation = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: ORGANISATION.nom,
    url: base,
    description: ORGANISATION.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${ORGANISATION.departement} (${ORGANISATION.codeDepartement})`,
    },
  };

  const cours = parcours.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title,
    description: p.description,
    url: `${base}/formations`,
    provider: { "@type": "EducationalOrganization", name: ORGANISATION.nom, url: base },
  }));

  return (
    <>
      {[organisation, ...cours].map((donnees, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
        />
      ))}
    </>
  );
}
