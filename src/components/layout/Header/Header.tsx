'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Header.module.scss';

const navigation = [
  { name: 'MEDICAL', href: '/medical' },
  { name: 'TASTE', href: '/taste' },
  { name: 'MAGAZINE', href: '/magazine' },
  { name: 'SHOP', href: '/shop' },
  { name: 'SOCIAL', href: '/social' },
  { name: 'COMMUNITY', href: '/community' },
];

export function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  
  const handleLogout = () => {
    setUserMenuOpen(false);
    signOut();
    router.push('/');
  };
  
  // 메인 페이지에서는 투명 헤더
  const isHome = pathname === '/';
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className={`${styles.header} ${isHome ? styles.transparent : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>BEAUTY N TASTE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right actions - 모바일에서도 표시 */}
        <div className={styles.actions}>
          {loading ? (
            <div className={styles.loadingSpinner} />
          ) : user ? (
            <>
              <div className={styles.userMenu}>
                  <button 
                    className={styles.iconButton}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="사용자 메뉴"
                  >
                    <User size={20} />
                  </button>
                  
                  {userMenuOpen && (
                    <div className={styles.dropdown}>
                      <Link 
                        href="/mypage" 
                        className={styles.dropdownItem}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={16} />
                        <span>마이페이지</span>
                      </Link>
                      <button 
                        type="button"
                        onClick={handleLogout} 
                        className={styles.dropdownItem}
                      >
                        <LogOut size={16} />
                        <span>로그아웃</span>
                      </button>
                    </div>
                  )}
              </div>
            </>
          ) : (
            <Link 
              href="/login"
              className={styles.iconButton}
              aria-label="로그인"
            >
              <LogIn size={20} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
