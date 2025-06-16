import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    // Only use standalone output in production
    ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'template.creativemox.com',
        }
      ],
    },
    // Enable hot reloading in development
    ...(process.env.NODE_ENV === 'development' && {
      webpack: (config, { dev }) => {
        if (dev) {
          config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
          };
        }
        return config;
      },
    }),
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);