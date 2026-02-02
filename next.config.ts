import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/**`)],
    qualities: [25, 50, 75, 100],
  },
  reactCompiler: true,
};

export default nextConfig;
