import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  disable: isDev, // 👈 desactiva el SW en dev
  register: true,
  skipWaiting: true,
})(nextConfig);
