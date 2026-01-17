// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["gsap"], // Crucial for GSAP to work in App Router
};

export default nextConfig;