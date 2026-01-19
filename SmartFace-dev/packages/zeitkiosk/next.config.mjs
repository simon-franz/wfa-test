import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.externals.push('canvas');

    return config;
  },
  compiler: {
    emotion: {
      autoLabel: 'always',
      labelFormat: '[local]-in-[filename]',
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
