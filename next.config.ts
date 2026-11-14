import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Hôte Supabase Storage, déduit de la variable serveur SUPABASE_URL.
const supabaseHost = process.env.SUPABASE_URL
  ? new URL(process.env.SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
