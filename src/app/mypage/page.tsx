import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/layout/Header';
import { MyPageContent } from './MyPageContent';
import styles from './page.module.scss';

export default async function MyPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/');
  }

  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  const userInfo = {
    id: user.id,
    email: userProfile?.email || user.email || '',
    name: userProfile?.name || user.user_metadata?.name || user.user_metadata?.full_name || '사용자',
    phone: userProfile?.phone || user.user_metadata?.phone || '',
    provider: userProfile?.provider || user.app_metadata?.provider || 'email',
    createdAt: userProfile?.created_at || user.created_at,
  };

  return (
    <main className={styles.page}>
      <Header />
      <MyPageContent user={userInfo} />
    </main>
  );
}

