'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithKakao: () => void;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);

  useEffect(() => {
    // 클라이언트에서만 실행되도록 보장
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // 클라이언트 초기화 (브라우저에서만 실행됨)
    supabaseRef.current = createClient();

    // 환경 변수가 없으면 초기화 중단
    if (!supabaseRef.current) {
      console.error('❌ Supabase 클라이언트 초기화 실패: 환경 변수가 설정되지 않았습니다.');
      console.error('Vercel에서 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정했는지 확인하세요.');
      setLoading(false);
      return;
    }

    const supabase = supabaseRef.current;

    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 인증 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // 카카오 로그인
  const signInWithKakao = () => {
    if (!supabaseRef.current) {
      alert('Supabase 클라이언트가 초기화되지 않았습니다. 환경 변수를 확인해주세요.');
      return;
    }
    supabaseRef.current.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // 구글 로그인
  const signInWithGoogle = () => {
    if (!supabaseRef.current) {
      alert('Supabase 클라이언트가 초기화되지 않았습니다. 환경 변수를 확인해주세요.');
      return;
    }
    supabaseRef.current.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // 로그아웃
  const signOut = () => {
    supabaseRef.current?.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithKakao, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

