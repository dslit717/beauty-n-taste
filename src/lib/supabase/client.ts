import { createBrowserClient } from '@supabase/ssr';

// 싱글톤 패턴 - 클라이언트 인스턴스 재사용
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // NEXT_PUBLIC_ 환경 변수는 빌드 시점에 번들에 포함됨
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 디버깅: 브라우저에서 환경 변수 확인
  if (typeof window !== 'undefined') {
    console.log('🔍 환경 변수 확인:', {
      NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? 'exists' : 'undefined',
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
    });
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    const errorMsg = 
      '❌ Missing Supabase environment variables!\n\n' +
      'Vercel에서 환경 변수를 설정했는지 확인하세요:\n' +
      '1. Vercel Dashboard > Settings > Environment Variables\n' +
      '2. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY 추가\n' +
      '3. "All Environments" 선택\n' +
      '4. 환경 변수 추가 후 "Redeploy" (빌드 캐시 없이)\n\n' +
      `현재 상태: URL=${supabaseUrl ? '있음' : '없음'}, KEY=${supabaseAnonKey ? '있음' : '없음'}`;
    
    if (typeof window !== 'undefined') {
      console.error(errorMsg);
    }
    
    throw new Error(errorMsg);
  }

  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

