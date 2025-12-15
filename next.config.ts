import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'encrypted-tbn0.gstatic.com'],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
