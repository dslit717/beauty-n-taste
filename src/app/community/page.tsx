'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { CommunityReviewCard, EventCard } from '@/components/cards';
import { CommunityReview, Event } from '@/types/community';
import styles from './page.module.scss';

type TabType = 'reviews' | 'events';

const TABS: { key: TabType; label: string }[] = [
  { key: 'reviews', label: 'Real Reviews' },
  { key: 'events', label: 'Event & Campaign' },
];

function CommunityContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'reviews';
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [reviews, setReviews] = useState<CommunityReview[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('type', activeTab);
        if (activeTab === 'events') params.set('active', 'true');
        
        const response = await fetch(`/api/community?${params}`);
        const data = await response.json();
        
        if (activeTab === 'reviews') {
          setReviews(data.data);
        } else {
          setEvents(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      {/* 콘텐츠 */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : activeTab === 'reviews' ? (
        reviews.length > 0 ? (
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <CommunityReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>리뷰가 없습니다.</p>
          </div>
        )
      ) : events.length > 0 ? (
        <div className={styles.grid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>진행 중인 이벤트가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default function CommunityPage() {
  return (
    <main className={styles.page}>
      <Header />
      <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
        <CommunityContent />
      </Suspense>
    </main>
  );
}

