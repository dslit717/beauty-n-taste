import { createBrowserClient } from '@supabase/ssr';

// 싱글톤 패턴 - 클라이언트 인스턴스 재사용
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient(): ReturnType<typeof createBrowserClient> | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 디버깅: 브라우저에서 환경 변수 확인
  if (typeof window !== 'undefined') {
    console.log('🔍 환경 변수 확인:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'undefined',
    });
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.error('❌ 환경 변수가 없습니다!');
      console.error('현재 process.env.NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || 'undefined');
      console.error('현재 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '있음' : '없음');
      console.error('\n해결 방법:');
      console.error('1. Vercel Dashboard > Settings > Environment Variables 확인');
      console.error('2. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY가 "All Environments"에 설정되어 있는지 확인');
      console.error('3. 환경 변수 값에 공백이나 따옴표가 없는지 확인');
      console.error('4. 환경 변수 추가/수정 후 "Redeploy" (빌드 캐시 없이) 실행');
    }
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

