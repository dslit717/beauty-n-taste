'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.scss';

export default function LoginPage() {
  const { user, loading, signInWithKakao, signInWithGoogle } = useAuth();
  const router = useRouter();

  // 이미 로그인된 경우 홈으로
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>로딩 중...</div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>LOGIN</h1>
          <p>로그인</p>
        </header>

        <div className={styles.buttons}>
          <button 
            className={styles.kakaoButton}
            onClick={signInWithKakao}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.8 5.16 4.5 6.54-.18.66-.66 2.4-.76 2.76-.12.48.18.48.36.36.15-.09 2.34-1.56 3.3-2.22.54.06 1.08.12 1.6.12 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
            </svg>
            <span>카카오로 3초 만에 시작하기</span>
          </button>

          <div className={styles.divider}>
            <span>또는</span>
          </div>

          <div className={styles.socialButtons}>
            <button 
              className={styles.googleButton}
              onClick={signInWithGoogle}
              aria-label="구글 로그인"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

