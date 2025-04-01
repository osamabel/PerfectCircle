import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
        domains: [
            'template.creativemox.com',
        ]
    },
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