import { defineConfig } from "vitest/config";
import path from "node:path";

// Config dédiée au bootstrap du schéma Payload (base jetable uniquement).
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: { include: ["scripts/payload-schema/*.vitest.ts"] },
});
