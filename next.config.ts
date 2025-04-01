import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
        domains: [
            'template.creativemox.com',
            'kc8w088c08808kwo0kcwc48c.64.226.67.120.sslip.io'
        ]
    },
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'kc8w088c08808kwo0kcwc48c.64.226.67.120.sslip.io',
        port: '',
        pathname: '/uploads/**',
      },
    ],
    async rewrites() {
        return [
          {
            source: '/uploads/:path*',
            destination: '/uploads/:path*',
          },
        ];
      },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);