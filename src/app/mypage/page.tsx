import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { MyPageContent } from './MyPageContent';
import styles from './page.module.scss';

export default async function MyPage() {
  const supabase = await createClient();
  
  // 서버에서 인증 체크 (보안!)
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // 미인증시 홈으로 리다이렉트
  if (error || !user) {
    redirect('/');
  }

  // 사용자 정보 추출
  const userInfo = {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.user_metadata?.full_name || '사용자',
    phone: user.user_metadata?.phone || '',
    provider: user.app_metadata?.provider || 'email',
    createdAt: user.created_at,
  };

  return (
    <main className={styles.page}>
      <Header />
      <MyPageContent user={userInfo} />
    </main>
  );
}

