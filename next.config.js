/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      const rules = config.module.rules.find((rule) => typeof rule.oneOf === 'object');
      if (rules) {
        rules.oneOf.forEach((rule) => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach((loader) => {
              if (
                loader.loader &&
                loader.loader.includes('css-loader') &&
                loader.options &&
                loader.options.modules
              ) {
                loader.options.modules.localIdentName = '[local]';
              }
            });
          }
        });
      }
    }
    return config;
  },
};

module.exports = nextConfig;
