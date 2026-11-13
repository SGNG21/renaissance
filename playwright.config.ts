import { defineConfig } from "@playwright/test";

// Les tests e2e ciblent une URL déployée (aperçu Vercel), jamais un déploiement local.
export default defineConfig({
  testDir: "e2e",
  use: { baseURL: process.env.E2E_BASE_URL, trace: "off" },
});
