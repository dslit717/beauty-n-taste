'use client';

import { createBrowserClient } from '@supabase/ssr';

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  // 브라우저 환경 체크
  if (typeof window === 'undefined') {
    return null;
  }

  // Next.js 15에서는 process.env 대신 직접 접근
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 디버깅
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase 환경 변수 누락:', {
      url: supabaseUrl ? '✓' : '✗',
      key: supabaseAnonKey ? '✓' : '✗',
    });
    return null;
  }

  // 싱글톤 패턴
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }

  return supabaseInstance;
}

