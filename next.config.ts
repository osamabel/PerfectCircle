import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
      domains: [], // Keep for backward compatibility
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'template.creativemox.com',
        },
        {
          protocol: 'http',
          hostname: '**.64.226.67.120.sslip.io',
        }
      ],
    },
    async rewrites() {
        return [];
      },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);