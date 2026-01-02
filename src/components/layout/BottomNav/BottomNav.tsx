'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Stethoscope, Utensils, BookOpen, ShoppingBag, Users } from 'lucide-react';
import styles from './BottomNav.module.scss';

const navigation = [
  { name: '탐색', href: '/', icon: Search },
  { name: 'MEDICAL', href: '/medical', icon: Stethoscope },
  { name: 'TASTE', href: '/taste', icon: Utensils },
  { name: 'SHOP', href: '/shop', icon: ShoppingBag },
  { name: 'COMMUNITY', href: '/community', icon: Users },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.bottomNav}>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
          >
            <Icon size={22} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

