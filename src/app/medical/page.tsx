'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { TreatmentCard, ClinicCard } from '@/components/cards';
import { SearchBar, CategoryFilter } from '@/components/ui';
import { useFilters } from '@/lib/hooks/useFilters';
import { TREATMENT_CATEGORIES } from '@/lib/constants';
import { Treatment, Clinic } from '@/types/medical';
import styles from './page.module.scss';

type TabType = 'treatments' | 'clinics';

function MedicalContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(tabParam || 'treatments');
  
  const { filters, updateFilters } = useFilters();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  // 시술 데이터 fetch
  useEffect(() => {
    if (activeTab !== 'treatments') return;
    
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category !== 'all') params.set('category', filters.category);
        if (filters.search) params.set('search', filters.search);
        
        const response = await fetch(`/api/treatments?${params}`);
        const data = await response.json();
        setTreatments(data.data);
      } catch (error) {
        console.error('Failed to fetch treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, [filters, activeTab]);

  // 병원 데이터 fetch
  useEffect(() => {
    if (activeTab !== 'clinics') return;
    
    const fetchClinics = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        params.set('bntOnly', 'true');
        
        const response = await fetch(`/api/clinics?${params}`);
        const data = await response.json();
        setClinics(data.data);
      } catch (error) {
        console.error('Failed to fetch clinics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [filters.search, activeTab]);

  return (
    <div className={styles.container}>
      {/* 탭 네비게이션 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'treatments' ? styles.active : ''}`}
          onClick={() => setActiveTab('treatments')}
        >
          시술 백과
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'clinics' ? styles.active : ''}`}
          onClick={() => setActiveTab('clinics')}
        >
          B&T 클리닉
        </button>
      </div>

      {/* 필터 섹션 */}
      <div className={styles.filterSection}>
        <SearchBar
          value={filters.search}
          onChange={(value) => updateFilters({ search: value })}
          placeholder={activeTab === 'treatments' ? '시술명 검색...' : '병원명, 지역 검색...'}
        />
        {activeTab === 'treatments' && (
          <CategoryFilter
            categories={TREATMENT_CATEGORIES}
            value={filters.category}
            onChange={(category) => updateFilters({ category })}
          />
        )}
      </div>

      {/* 결과 */}
      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : activeTab === 'treatments' ? (
        treatments.length > 0 ? (
          <div className={styles.grid}>
            {treatments.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>검색 결과가 없습니다.</p>
          </div>
        )
      ) : (
        clinics.length > 0 ? (
          <div className={styles.grid}>
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>검색 결과가 없습니다.</p>
          </div>
        )
      )}
    </div>
  );
}

export default function MedicalPage() {
  return (
    <main className={styles.page}>
      <Header />
      <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
        <MedicalContent />
      </Suspense>
    </main>
  );
}
