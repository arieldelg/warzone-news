/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            hostname: "cdn.shopify.com",
            protocol: 'https'
        },
        {
            hostname: 'randomfox.ca',
            protocol: 'https'
        }
    ]
    }
};

export default nextConfig;
