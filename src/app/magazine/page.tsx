'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { ArticleCard } from '@/components/cards';
import { Article } from '@/types/magazine';
import styles from './page.module.scss';

type TabType = 'all' | 'pairing' | 'after-care';

const TABS: { key: TabType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'pairing', label: 'B&T Pick' },
  { key: 'after-care', label: 'After-Care Guide' },
];

function MagazineContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'all';
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeTab !== 'all') params.set('category', activeTab);
        
        const response = await fetch(`/api/articles?${params}`);
        const data = await response.json();
        setArticles(data.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeTab]);

  return (
    <div className={styles.container}>
      {/* 탭 네비게이션 */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className={styles.grid}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>아티클이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default function MagazinePage() {
  return (
    <main className={styles.page}>
      <Header />
      <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
        <MagazineContent />
      </Suspense>
    </main>
  );
}

