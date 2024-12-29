// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','jonsenterfitt.com'], // Add your hostname here
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;