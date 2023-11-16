/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rsgchglqhbpfmrvsjark.supabase.co',
                port: "",
            }
        ]
    },
    experimental: {
        typedRoutes: true,
    },
}

module.exports = nextConfig
