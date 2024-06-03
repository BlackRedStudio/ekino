/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                pathname: '/photos/**'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/filmy-i-seriale',
                destination: '/szukaj',
                permanent: false
            },
            {
                source: '/filmy-i-seriale/:type',
                destination: '/szukaj',
                permanent: false
            },
            // przekierowanie całej ścieżki
            // {
            //     source: '/szukaj/:slug*',
            //     destination: '/',
            //     permanent: false
            // }
        ]
    }
};

export default nextConfig;
