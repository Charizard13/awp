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
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    serverActions: {
      allowedOrigins: ["http://127.0.0.1:54321", "https://rsgchglqhbpfmrvsjark.supabase.co"]
    }
  },
  transpilePackages: ["lucide-react"],
};

module.exports = nextConfig;
