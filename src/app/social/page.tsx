'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SocialCard } from '@/components/cards';
import { SocialContent, SocialTab } from '@/types/social';
import styles from './page.module.scss';

const TABS: { key: SocialTab; label: string }[] = [
  { key: 'influencer', label: '인플루언서' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'blog', label: 'Blog' },
];

function SocialContent_() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as SocialTab) || 'influencer';
  
  const [activeTab, setActiveTab] = useState<SocialTab>(initialTab);
  const [contents, setContents] = useState<SocialContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('platform', activeTab);
        
        const response = await fetch(`/api/social?${params}`);
        const data = await response.json();
        setContents(data.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // 그리드 스타일 결정
  const getGridClass = () => {
    return styles.grid;
  };

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

      {/* 콘텐츠 */}
      {loading ? (
        <div className={getGridClass()}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : contents.length > 0 ? (
        <div className={getGridClass()}>
          {contents.map((content) => (
            <SocialCard key={content.id} content={content} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>콘텐츠가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default function SocialPage() {
  return (
    <main className={styles.page}>
      <Header />
      <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
        <SocialContent_ />
      </Suspense>
    </main>
  );
}

