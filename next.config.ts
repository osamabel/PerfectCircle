/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    turbopack: true,
  },
  images: {
    domains: ['your-image-domain.com'],
  },
};

module.exports = nextConfig;