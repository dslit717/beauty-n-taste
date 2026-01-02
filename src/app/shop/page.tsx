'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/cards';
import { Product } from '@/types/shop';
import styles from './page.module.scss';

type TabType = 'all' | 'beauty-clinic' | 'taste-inner';

const TABS: { key: TabType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'beauty-clinic', label: 'Beauty & Clinic' },
  { key: 'taste-inner', label: 'Taste & Inner Beauty' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'all';
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeTab !== 'all') params.set('type', activeTab);
        
        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

      {/* Products Grid */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>상품이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className={styles.page}>
      <Header />
      <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
        <ShopContent />
      </Suspense>
    </main>
  );
}

