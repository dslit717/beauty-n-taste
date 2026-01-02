/** @type {import('next').NextConfig} */
const nextConfig = {
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

// 빌드 시점에 환경 변수 확인 (디버깅용)
if (process.env.NODE_ENV === 'production') {
  console.log('🔍 빌드 시점 환경 변수 확인:');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 설정됨' : '❌ 없음');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 없음');
}

module.exports = nextConfig;
