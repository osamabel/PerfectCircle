import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
        domains: [
            'template.creativemox.com',
            '64.226.67.120.sslip.io',
            'kc8w088c08808kwo0kcwc48c.64.226.67.120.sslip.io'
        ]
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);