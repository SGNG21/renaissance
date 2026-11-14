import { defineConfig } from "@playwright/test";

/**
 * Tests de bout en bout du parcours de préinscription.
 *
 * Ils ciblent une URL DÉPLOYÉE (aperçu Vercel ou recette), jamais un
 * déploiement local :
 *   E2E_BASE_URL=https://… pnpm e2e
 *
 * PLAYWRIGHT_CHROMIUM_PATH permet d'utiliser un Chromium déjà présent sur la
 * machine quand la version téléchargée par Playwright n'est pas disponible.
 */
export default defineConfig({
  testDir: "e2e",
  use: {
    baseURL: process.env.E2E_BASE_URL,
    trace: "off",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
  },
});
