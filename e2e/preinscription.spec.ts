import { expect, test } from "@playwright/test";

/**
 * Parcours de préinscription (cahier technique, point 9).
 *
 * Écrits AVANT la recette. Ils s'exécutent contre une URL déployée :
 *   E2E_BASE_URL=https://… pnpm e2e
 *
 * Les tests qui écrivent en base sont marqués @ecriture : ils créent un vrai
 * lead et ne doivent être lancés que sur un environnement de recette.
 */

test.describe("Préinscription", () => {
  test("la page affiche le formulaire complet", async ({ page }) => {
    await page.goto("/preinscription");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Et si tout commençait");

    for (const libelle of [
      "Prénom *",
      "Nom *",
      "Adresse e-mail *",
      "Téléphone",
      "La formation qui vous intéresse *",
      "Votre commune ou département",
      "Vos disponibilités",
      "Votre projet",
    ]) {
      await expect(page.getByLabel(libelle, { exact: true })).toBeVisible();
    }

    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("button", { name: /Demander des informations/ })).toBeVisible();
  });

  test("les quatre formations sont proposées, sans FLE", async ({ page }) => {
    await page.goto("/preinscription");

    const valeurs = await page
      .getByLabel("La formation qui vous intéresse *", { exact: true })
      .locator("option")
      .evaluateAll((options) =>
        options.map((o) => (o as HTMLOptionElement).value).filter(Boolean),
      );

    expect(valeurs).toEqual([
      "accueil-familial",
      "animation-vie-sociale",
      "dame-de-compagnie",
      "autre",
    ]);
    expect(valeurs).not.toContain("fle");
  });

  test("la formation est présélectionnée depuis l'URL", async ({ page }) => {
    await page.goto("/preinscription?formation=dame-de-compagnie&zone=sens");

    await expect(page.getByLabel("La formation qui vous intéresse *", { exact: true })).toHaveValue(
      "dame-de-compagnie",
    );
    await expect(page.getByLabel("Votre commune ou département", { exact: true })).toHaveValue("sens");
  });

  test("le consentement est obligatoire", async ({ page }) => {
    await page.goto("/preinscription");

    await page.getByLabel("Prénom *", { exact: true }).fill("Camille");
    await page.getByLabel("Nom *", { exact: true }).fill("Durand");
    await page.getByLabel("Adresse e-mail *", { exact: true }).fill("camille.durand@example.fr");
    await page.getByLabel("La formation qui vous intéresse *", { exact: true }).selectOption("accueil-familial");

    await page.getByRole("button", { name: /Demander des informations/ }).click();

    // Le navigateur bloque l'envoi : on reste sur la page.
    await expect(page).toHaveURL(/\/preinscription$/);
    await expect(page.getByRole("checkbox")).not.toBeChecked();
  });

  test("le champ piège est masqué et hors du parcours clavier", async ({ page }) => {
    await page.goto("/preinscription");

    const piege = page.locator("#siteWeb");
    await expect(piege).toHaveAttribute("tabindex", "-1");
    await expect(piege).not.toBeInViewport();
  });

  test("la route serveur refuse une demande sans consentement", async ({ request }) => {
    const reponse = await request.post("/api/preinscription", {
      data: {
        prenom: "Camille",
        nom: "Durand",
        email: "camille.durand@example.fr",
        formationVisee: "accueil-familial",
        consentement: false,
      },
    });

    expect(reponse.status()).toBe(422);
    const corps = await reponse.json();
    expect(corps.champs).toHaveProperty("consentement");
  });

  test("la route serveur refuse une formation hors périmètre", async ({ request }) => {
    const reponse = await request.post("/api/preinscription", {
      data: {
        prenom: "Camille",
        nom: "Durand",
        email: "camille.durand@example.fr",
        formationVisee: "fle",
        consentement: true,
      },
    });

    expect(reponse.status()).toBe(422);
  });

  test("@ecriture une demande valide mène à la page de remerciement", async ({ page }) => {
    await page.goto("/preinscription");

    const horodatage = Date.now();
    await page.getByLabel("Prénom *", { exact: true }).fill("Recette");
    await page.getByLabel("Nom *", { exact: true }).fill("Playwright");
    await page.getByLabel("Adresse e-mail *", { exact: true }).fill(`recette+${horodatage}@example.fr`);
    await page.getByLabel("Téléphone", { exact: true }).fill("03 86 00 00 00");
    await page.getByLabel("La formation qui vous intéresse *", { exact: true }).selectOption("accueil-familial");
    await page.getByLabel("Votre commune ou département", { exact: true }).fill("Sens");
    await page.getByLabel("Vos disponibilités", { exact: true }).fill("En semaine");
    await page.getByLabel("Votre projet", { exact: true }).fill("Test automatisé de recette.");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: /Demander des informations/ }).click();

    await expect(page).toHaveURL(/\/preinscription\/merci$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Merci");
  });
});

test.describe("Pages SEO locales", () => {
  for (const zone of ["yonne", "joigny", "sens", "auxerre"]) {
    test(`/formation-${zone} répond et renvoie vers la préinscription`, async ({ page }) => {
      const reponse = await page.goto(`/formation-${zone}`);
      expect(reponse?.status()).toBe(200);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator('a[href^="/preinscription"]').first()).toBeVisible();
    });
  }

  test("une zone inconnue renvoie 404", async ({ page }) => {
    const reponse = await page.goto("/formation-inexistante");
    expect(reponse?.status()).toBe(404);
  });
});

test.describe("Règles de marque", () => {
  test("« Villa Renaissance » n'apparaît que sur les mentions légales", async ({ page }) => {
    for (const chemin of ["/", "/formations", "/preinscription", "/confidentialite"]) {
      await page.goto(chemin);
      await expect(page.locator("body")).not.toContainText("Villa Renaissance");
    }

    await page.goto("/mentions-legales");
    await expect(page.locator("body")).toContainText("Villa Renaissance");
  });
});
