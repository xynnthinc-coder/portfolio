import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    // Add support for .glb files
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
    });

    // Add support for .gltf files
    config.module.rules.push({
      test: /\.gltf$/,
      type: 'asset/resource',
    });

    // Disable source maps in development for faster builds
    if (dev) {
      config.devtool = false;
    }

    return config;
  },

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