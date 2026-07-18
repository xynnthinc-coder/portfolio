import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Explicitly set turbopack config to avoid "webpack config but no turbopack config" error in Next.js 16
  turbopack: {},

  // Tree-shake heavy libraries — hanya import yang dipakai yang di-bundle
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'three',
      '@react-three/drei',
      'gsap',
    ],
  },
};

export default nextConfig;