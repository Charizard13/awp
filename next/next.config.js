/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rsgchglqhbpfmrvsjark.supabase.co",
        port: "",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54321",
      }
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ["lucide-react"],
};

module.exports = nextConfig;
