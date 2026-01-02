'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock } from 'lucide-react';
import { Article } from '@/types/magazine';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui';
import { ARTICLE_CATEGORY_LABELS } from '@/lib/constants';
import styles from './MagazinePreview.module.scss';

export function MagazinePreview() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles?limit=4')
      .then(res => res.json())
      .then(data => setArticles(data.data || []));
  }, []);

  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>MAGAZINE</h2>
          <Link href="/magazine" className={styles.link}>
            <ChevronRight size={25} />
          </Link>
        </div>

        <div className={styles.grid}>
          {/* Featured Article */}
          {featured && (
            <Card href={`/magazine/${featured.id}`} className={styles.featuredCard}>
              <CardImage
                src={featured.imageUrl}
                alt={featured.title}
                aspectRatio="wide"
              />
              <CardContent className={styles.featuredContent}>
                <span className={styles.category}>
                  {ARTICLE_CATEGORY_LABELS[featured.category]}
                </span>
                <CardTitle className={styles.featuredTitle}>{featured.title}</CardTitle>
                <CardDescription>{featured.excerpt}</CardDescription>
              </CardContent>
            </Card>
          )}

          {/* Other Articles */}
          <div className={styles.list}>
            {rest.map((article) => (
              <Link key={article.id} href={`/magazine/${article.id}`} className={styles.listCard}>
                <div className={styles.listImage}>
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="120px"
                    className={styles.image}
                  />
                </div>
                <div className={styles.listContent}>
                  <span className={styles.categorySmall}>
                    {ARTICLE_CATEGORY_LABELS[article.category]}
                  </span>
                  <h4>{article.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
