import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté SERVEUR uniquement (route handlers, server actions).
 * Utilise la clé service_role : elle contourne la RLS et ne doit JAMAIS atteindre
 * le navigateur. L'import "server-only" fait échouer le build si ce module est
 * importé depuis un composant client.
 */
let client: SupabaseClient | undefined;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Variables manquantes : SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY (à définir dans Vercel).",
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
