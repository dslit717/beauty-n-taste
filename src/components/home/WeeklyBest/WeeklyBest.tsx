'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui';
import styles from './WeeklyBest.module.scss';

interface RankItem {
  id: string;
  rank: number;
  title: string;
  subtitle: string;
  image: string;
  category: 'medical' | 'taste' | 'magazine';
  href: string;
}

const CATEGORY_LABELS = {
  medical: 'MEDICAL',
  taste: 'TASTE',
  magazine: 'MAGAZINE',
};

export function WeeklyBest() {
  const [items, setItems] = useState<RankItem[]>([]);

  useEffect(() => {
    // 각 카테고리에서 인기 아이템 가져오기
    const fetchData = async () => {
      try {
        const [treatmentsRes, restaurantsRes, articlesRes] = await Promise.all([
          fetch('/api/treatments?limit=2'),
          fetch('/api/restaurants?limit=2'),
          fetch('/api/articles?limit=1'),
        ]);

        const treatments = await treatmentsRes.json();
        const restaurants = await restaurantsRes.json();
        const articles = await articlesRes.json();

        // 통합 랭킹 생성 (실제로는 조회수/좋아요 기반으로 정렬)
        const combined: RankItem[] = [
          ...(treatments.data || []).slice(0, 2).map((t: any, i: number) => ({
            id: t.id,
            rank: i === 0 ? 1 : 3,
            title: t.name,
            subtitle: t.description,
            image: t.imageUrl,
            category: 'medical' as const,
            href: `/medical/treatments/${t.id}`,
          })),
          ...(restaurants.data || []).slice(0, 2).map((r: any, i: number) => ({
            id: r.id,
            rank: i === 0 ? 2 : 4,
            title: r.name,
            subtitle: r.description,
            image: r.images[0],
            category: 'taste' as const,
            href: `/taste/${r.id}`,
          })),
          ...(articles.data || []).slice(0, 1).map((a: any) => ({
            id: a.id,
            rank: 5,
            title: a.title,
            subtitle: a.excerpt,
            image: a.imageUrl,
            category: 'magazine' as const,
            href: `/magazine/${a.id}`,
          })),
        ];

        // rank 순으로 정렬
        combined.sort((a, b) => a.rank - b.rank);
        setItems(combined.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch weekly best:', error);
      }
    };

    fetchData();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>WEEKLY BEST</h2>
          </div>
          <p className={styles.subtitle}>이번 주 가장 인기있는 콘텐츠</p>
        </div>

        <div className={styles.list}>
          {items.map((item, index) => (
            <Link key={item.id} href={item.href} className={styles.item}>
              <div className={styles.rank}>
                <span className={index < 3 ? styles.topRank : ''}>
                  {item.rank}
                </span>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemSubtitle}>{item.subtitle}</p>
              </div>
              <ChevronRight size={20} className={styles.arrow} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

