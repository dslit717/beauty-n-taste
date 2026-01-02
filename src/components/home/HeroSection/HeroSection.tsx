'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import styles from './HeroSection.module.scss';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=1600&h=900&fit=crop&q=80',
    badge: 'WINTER EDITION',
    title: 'Glow Different',
    subtitle: '겨울, 빛나는 피부를 위한\n프리미엄 시술 패키지',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&h=900&fit=crop&q=80',
    badge: 'CHEF\'S TABLE',
    title: 'Taste the Art',
    subtitle: '미슐랭 셰프가 선사하는\n특별한 다이닝 경험',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1600&h=900&fit=crop&q=80',
    badge: 'BEAUTY & TASTE',
    title: 'After Care\nGourmet',
    subtitle: '시술 후 회복을 돕는\n이너뷰티 미식 큐레이션',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop&q=80',
    badge: 'NEW ARRIVAL',
    title: 'Premium\nSkin Clinic',
    subtitle: 'B&T가 엄선한\n프리미엄 피부과 시술',
  },
];

export function HeroSection() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className={styles.image}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <span>{slide.badge}</span>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.subtitle}>{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button 
        className={`${styles.navButton} ${styles.navPrev}`}
        onClick={() => swiperRef?.slidePrev()}
      >
        <img src="/assets/icons/arrow_left_w.svg" alt="이전" />
      </button>
      <button 
        className={`${styles.navButton} ${styles.navNext}`}
        onClick={() => swiperRef?.slideNext()}
      >
        <img src="/assets/icons/arrow_right_w.svg" alt="다음"  />
      </button>

      {/* Progress Bar & Pagination */}
      <div className={styles.pagination}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progress} 
            style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
          />
        </div>
        <div className={styles.pageNumber}>
          <span className={styles.current}>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.total}>{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}
