import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don’t fail production build on ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  typescript: {
    // Don’t fail production build on TS type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
