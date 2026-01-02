'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { RestaurantCard } from '@/components/cards';
import { SearchBar, CategoryFilter } from '@/components/ui';
import { useFilters } from '@/lib/hooks/useFilters';
import { RESTAURANT_CATEGORIES } from '@/lib/constants';
import { Restaurant } from '@/types/taste';
import styles from './page.module.scss';

type TabType = 'all' | 'chefsTable' | 'photoSpot';

const TABS: { key: TabType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'chefsTable', label: "Chef's Table" },
  { key: 'photoSpot', label: 'Photo Spot' },
];

function TasteContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'all';
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const { filters, updateFilters } = useFilters();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeTab !== 'all') params.set('type', activeTab);
        if (filters.category !== 'all') params.set('category', filters.category);
        if (filters.search) params.set('search', filters.search);
        
        const response = await fetch(`/api/restaurants?${params}`);
        const data = await response.json();
        setRestaurants(data.data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [activeTab, filters]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    updateFilters({ category: 'all', search: '' });
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
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <SearchBar
          value={filters.search}
          onChange={(value) => updateFilters({ search: value })}
          placeholder="맛집 검색..."
        />
        <CategoryFilter
          categories={RESTAURANT_CATEGORIES}
          value={filters.category}
          onChange={(category) => updateFilters({ category })}
        />
      </div>

      {/* Results */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : restaurants.length > 0 ? (
        <div className={styles.grid}>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default function TastePage() {
  return (
    <main className={styles.page}>
      <Header />
      <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
        <TasteContent />
      </Suspense>
    </main>
  );
}
