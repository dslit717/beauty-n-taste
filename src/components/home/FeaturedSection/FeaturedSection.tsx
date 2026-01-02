'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Treatment } from '@/types/medical';
import { Restaurant } from '@/types/taste';
import { Badge, Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui';
import { TREATMENT_CATEGORY_LABELS, RESTAURANT_CATEGORY_LABELS } from '@/lib/constants';
import 'swiper/css';
import styles from './FeaturedSection.module.scss';

export function FeaturedSection() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  // Navigation refs
  const medicalPrevRef = useRef<HTMLButtonElement>(null);
  const medicalNextRef = useRef<HTMLButtonElement>(null);
  const tastePrevRef = useRef<HTMLButtonElement>(null);
  const tasteNextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetch('/api/treatments?limit=9').then(res => res.json()).then(data => setTreatments(data.data || []));
    fetch('/api/restaurants?limit=9').then(res => res.json()).then(data => setRestaurants(data.data || []));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Medical Section */}
        <div className={styles.row}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>MEDICAL</h2>
            <Link href="/medical" className={styles.link}>
              <ChevronRight size={25} />
            </Link>
          </div>
          <div className={styles.swiperWrapper}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: medicalPrevRef.current,
                nextEl: medicalNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = medicalPrevRef.current;
                  swiper.params.navigation.nextEl = medicalNextRef.current;
                }
              }}
              spaceBetween={10}
              slidesPerView={1.1} 
              slidesPerGroup={1}
              breakpoints={{
                640: { slidesPerView: 2, slidesPerGroup: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
              }}
              className={styles.swiper}
            >
              {treatments.map((treatment) => (
                <SwiperSlide key={treatment.id}>
                  <Card href={`/medical/treatments/${treatment.id}`}>
                    <CardImage
                      src={treatment.imageUrl}
                      alt={treatment.name}
                      aspectRatio="landscape"
                      badge={<Badge>{TREATMENT_CATEGORY_LABELS[treatment.category]}</Badge>}
                    />
                    <CardContent>
                      <CardTitle>{treatment.name}</CardTitle>
                      <CardDescription>{treatment.description}</CardDescription>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
            <button ref={medicalPrevRef} className={`${styles.navButton} ${styles.navPrev}`}>
              <ChevronLeft size={25} />
            </button>
            <button ref={medicalNextRef} className={`${styles.navButton} ${styles.navNext}`}>
              <ChevronRight size={25} />
            </button>
          </div>
        </div>

        {/* Taste Section */}
        <div className={styles.row}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>TASTE</h2>
            <Link href="/taste" className={styles.link}>
              <ChevronRight size={25} />
            </Link>
          </div>
          <div className={styles.swiperWrapper}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: tastePrevRef.current,
                nextEl: tasteNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation) {
                  swiper.params.navigation.prevEl = tastePrevRef.current;
                  swiper.params.navigation.nextEl = tasteNextRef.current;
                }
              }}
              spaceBetween={10}
              slidesPerView={1.1} 
              slidesPerGroup={1}
              breakpoints={{
                640: { slidesPerView: 2, slidesPerGroup: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
              }}
              className={styles.swiper}
            >
              {restaurants.map((restaurant) => (
                <SwiperSlide key={restaurant.id}>
                  <Card href={`/taste/${restaurant.id}`}>
                    <CardImage
                      src={restaurant.images[0]}
                      alt={restaurant.name}
                      aspectRatio="landscape"
                      badge={<Badge>{RESTAURANT_CATEGORY_LABELS[restaurant.category]}</Badge>}
                    />
                    <CardContent>
                      <CardTitle>{restaurant.name}</CardTitle>
                      <CardDescription>{restaurant.description}</CardDescription>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
            <button ref={tastePrevRef} className={`${styles.navButton} ${styles.navPrev}`}>
              <ChevronLeft size={25} />
            </button>
            <button ref={tasteNextRef} className={`${styles.navButton} ${styles.navNext}`}>
              <ChevronRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
