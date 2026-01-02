'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  href?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
}

export interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  badge?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// Card Root
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, href, children, ...props }, ref) => {
    const content = (
      <div ref={ref} className={clsx(styles.card, className)} {...props}>
        {children}
      </div>
    );

    if (href) {
      return (
        <Link href={href} className={styles.cardLink}>
          {content}
        </Link>
      );
    }

    return content;
  }
);
Card.displayName = 'Card';

// Card Image
export function CardImage({ src, alt, aspectRatio = 'landscape', badge }: CardImageProps) {
  return (
    <div className={clsx(styles.imageWrapper, styles[aspectRatio])}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles.image}
      />
      {badge && <div className={styles.badge}>{badge}</div>}
    </div>
  );
}

// Card Content
export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={clsx(styles.content, className)} {...props}>
      {children}
    </div>
  );
}

// Card Title
export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={clsx(styles.title, className)}>{children}</h3>;
}

// Card Description
export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={clsx(styles.description, className)}>{children}</p>;
}

// Card Meta (for small info like date, author, etc.)
export function CardMeta({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(styles.meta, className)}>{children}</div>;
}

