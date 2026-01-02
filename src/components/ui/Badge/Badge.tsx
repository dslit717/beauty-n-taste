'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.scss';

interface BadgeProps {
  children: ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
}

export function Badge({ children, variant = 'dark', className }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}

