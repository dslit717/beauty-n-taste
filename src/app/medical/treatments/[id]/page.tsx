import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { ReviewCard } from '@/components/cards';
import { Badge, Button } from '@/components/ui';
import { Clock, RefreshCw, Activity, Check, AlertTriangle, Calendar, Heart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import treatmentsData from '@/data/treatments.json';
import reviewsData from '@/data/reviews.json';
import { TREATMENT_CATEGORY_LABELS } from '@/lib/constants';
import { Review } from '@/types/medical';
import styles from './page.module.scss';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const treatment = treatmentsData.find((t) => t.id === params.id);
  if (!treatment) return { title: '시술 정보' };
  
  return {
    title: treatment.name,
    description: treatment.description,
    openGraph: {
      title: treatment.name,
      description: treatment.description,
      images: [treatment.imageUrl],
    },
  };
}

export default function TreatmentDetailPage({ params }: PageProps) {
  const treatment = treatmentsData.find((t) => t.id === params.id);

  if (!treatment) {
    notFound();
  }

  // 해당 시술의 리뷰만 필터링
  const reviews = reviewsData.filter(
    (r) => r.type === 'treatment' && r.targetId === treatment.id
  ) as Review[];

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <Image
          src={treatment.imageUrl}
          alt={treatment.name}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.container}>
        <article className={styles.content}>
          <header className={styles.header}>
            <Badge>{TREATMENT_CATEGORY_LABELS[treatment.category]}</Badge>
            <h1>{treatment.name}</h1>
            <p className={styles.description}>{treatment.description}</p>
          </header>

          {/* 기본 정보 */}
          <section className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <Clock size={24} />
              <h3>시술 시간</h3>
              <p>{treatment.duration}</p>
            </div>
            <div className={styles.infoCard}>
              <RefreshCw size={24} />
              <h3>회복 기간</h3>
              <p>{treatment.recoveryTime}</p>
            </div>
            <div className={styles.infoCard}>
              <Activity size={24} />
              <h3>통증 정도</h3>
              <p>
                {'●'.repeat(treatment.painLevel)}
                {'○'.repeat(5 - treatment.painLevel)}
              </p>
            </div>
          </section>

          {/* 권장 주기 */}
          {treatment.recommendedCycle && (
            <section className={styles.cycle}>
              <div className={styles.cycleIcon}>
                <Calendar size={20} />
              </div>
              <div className={styles.cycleContent}>
                <h3>권장 시술 주기</h3>
                <p>{treatment.recommendedCycle}</p>
              </div>
            </section>
          )}

          {/* 기대 효과 */}
          <section className={styles.benefits}>
            <h2>기대 효과</h2>
            <ul>
              {treatment.benefits.map((benefit) => (
                <li key={benefit}>
                  <Check size={18} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 주의사항 */}
          {treatment.cautions && treatment.cautions.length > 0 && (
            <section className={styles.cautions}>
              <h2>
                <AlertTriangle size={20} />
                주의사항
              </h2>
              <ul>
                {treatment.cautions.map((caution, index) => (
                  <li key={index}>{caution}</li>
                ))}
              </ul>
            </section>
          )}

          {/* 부작용 */}
          {treatment.sideEffects && treatment.sideEffects.length > 0 && (
            <section className={styles.sideEffects}>
              <h2>발생 가능한 부작용</h2>
              <div className={styles.tagList}>
                {treatment.sideEffects.map((effect, index) => (
                  <span key={index} className={styles.tag}>{effect}</span>
                ))}
              </div>
            </section>
          )}

          {/* 애프터케어 */}
          {treatment.afterCare && treatment.afterCare.length > 0 && (
            <section className={styles.afterCare}>
              <h2>
                <Heart size={20} />
                시술 후 관리
              </h2>
              <ul>
                {treatment.afterCare.map((care, index) => (
                  <li key={index}>
                    <Check size={16} />
                    <span>{care}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 가격 */}
          <section className={styles.priceSection}>
            <h2>가격 안내</h2>
            <div className={styles.priceRange}>
              <span className={styles.priceLabel}>시작가</span>
              <span className={styles.price}>₩ {formatPrice(treatment.priceRange.min)}</span>
            </div>
            <div className={styles.priceRange}>
              <span className={styles.priceLabel}>최대가</span>
              <span className={styles.price}>₩ {formatPrice(treatment.priceRange.max)}</span>
            </div>
            <p className={styles.priceNote}>* 정확한 가격은 상담 후 결정됩니다.</p>
          </section>

          {/* 리뷰 */}
          <section className={styles.reviews}>
            <h2>시술 후기</h2>
            {reviews.length > 0 ? (
              <div className={styles.reviewList}>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className={styles.noReviews}>아직 등록된 후기가 없습니다.</p>
            )}
          </section>

          <div className={styles.actions}>
            <Button variant="primary" size="lg" fullWidth>
              상담 예약하기
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
  return treatmentsData.map((treatment) => ({
    id: treatment.id,
  }));
}
