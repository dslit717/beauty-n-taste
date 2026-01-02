'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Calendar, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui';
import styles from './page.module.scss';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  provider: string;
  createdAt: string;
}

interface MyPageContentProps {
  user: UserInfo;
}

const menuItems = [
  { label: '내 예약', href: '/mypage/reservations' },
  { label: '내 리뷰', href: '/mypage/reviews' },
  { label: '찜 목록', href: '/mypage/favorites' },
  { label: '설정', href: '/mypage/settings' },
];

export function MyPageContent({ user }: MyPageContentProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    signOut();
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getProviderLabel = (provider: string) => {
    const labels: Record<string, string> = {
      kakao: '카카오',
      google: '구글',
      email: '이메일',
    };
    return labels[provider] || provider;
  };

  return (
    <div className={styles.container}>
      {/* 프로필 섹션 */}
      <section className={styles.profileSection}>
        <div className={styles.avatar}>
          <User size={40} />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.name}>{user.name}</h1>
          <span className={styles.provider}>
            {getProviderLabel(user.provider)} 로그인
          </span>
        </div>
      </section>

      {/* 내 정보 */}
      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <ul className={styles.infoList}>
          <li>
            <Mail size={18} />
            <span className={styles.label}>이메일</span>
            <span className={styles.value}>{user.email || '-'}</span>
          </li>
          <li>
            <Phone size={18} />
            <span className={styles.label}>휴대전화</span>
            <span className={styles.value}>{user.phone || '-'}</span>
          </li>
          <li>
            <Calendar size={18} />
            <span className={styles.label}>가입일</span>
            <span className={styles.value}>{formatDate(user.createdAt)}</span>
          </li>
        </ul>
      </section>

      {/* 메뉴 */}
      <section className={styles.menuSection}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.menuItem}>
                <span>{item.label}</span>
                <ChevronRight size={18} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 로그아웃 */}
      <section className={styles.logoutSection}>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut size={18} />
          {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
        </Button>
      </section>
    </div>
  );
}

