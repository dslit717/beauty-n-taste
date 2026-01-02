import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Badge, Button } from '@/components/ui';
import { MapPin, Star, Phone, Clock, Camera, ChefHat } from 'lucide-react';
import restaurantsData from '@/data/restaurants.json';
import { RESTAURANT_CATEGORY_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import styles from './page.module.scss';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const restaurant = restaurantsData.find((r) => r.id === params.id);
  if (!restaurant) return { title: '맛집 정보' };
  
  return {
    title: restaurant.name,
    description: restaurant.description,
    openGraph: {
      title: restaurant.name,
      description: restaurant.description,
      images: [restaurant.images[0]],
    },
  };
}

export default function RestaurantDetailPage({ params }: PageProps) {
  const restaurant = restaurantsData.find((r) => r.id === params.id);

  if (!restaurant) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <Image
          src={restaurant.images[0]}
          alt={restaurant.name}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.container}>
        <article className={styles.content}>
          <header className={styles.header}>
            <div className={styles.badges}>
              <Badge>{RESTAURANT_CATEGORY_LABELS[restaurant.category]}</Badge>
            </div>

            <h1>{restaurant.name}</h1>

            <div className={styles.rating}>
              <Star size={18} fill="currentColor" />
              <span className={styles.ratingValue}>{restaurant.rating}</span>
              <span className={styles.reviewCount}>리뷰 {restaurant.reviewCount}개</span>
            </div>

            <p className={styles.description}>{restaurant.description}</p>
          </header>

          <section className={styles.info}>
            <h2>매장 정보</h2>
            <ul>
              <li>
                <MapPin size={18} />
                <span>{restaurant.address}</span>
              </li>
              <li>
                <Clock size={18} />
                <span>영업시간 11:00 - 22:00</span>
              </li>
              <li>
                <Phone size={18} />
                <span>02-1234-5678</span>
              </li>
            </ul>
          </section>

          <section className={styles.cuisine}>
            <h2>요리 종류</h2>
            <div className={styles.cuisineList}>
              {restaurant.cuisine.map((c) => (
                <Badge key={c} variant="light">{c}</Badge>
              ))}
            </div>
          </section>

          <section className={styles.tags}>
            <h2>태그</h2>
            <div className={styles.tagList}>
              {restaurant.tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          </section>

          <section className={styles.priceSection}>
            <h2>평균 가격</h2>
            <div className={styles.priceValue}>
              <span>₩</span>{formatPrice(restaurant.averagePrice)}
            </div>
          </section>

          <div className={styles.actions}>
            <Button variant="primary" size="lg" fullWidth>
              예약하기
            </Button>
            <Button variant="outline" size="lg" fullWidth>
              전화 문의
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return restaurantsData.map((restaurant) => ({
    id: restaurant.id,
  }));
}
