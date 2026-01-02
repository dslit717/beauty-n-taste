import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { ReviewCard } from '@/components/cards';
import { Badge, Button } from '@/components/ui';
import { MapPin, Phone, Clock, Award, Star, Users } from 'lucide-react';
import clinicsData from '@/data/clinics.json';
import reviewsData from '@/data/reviews.json';
import { Review } from '@/types/medical';
import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const clinic = clinicsData.find((c) => c.id === id);
  if (!clinic) return { title: '클리닉 정보' };
  
  return {
    title: clinic.name,
    description: clinic.description,
    openGraph: {
      title: clinic.name,
      description: clinic.description,
      images: clinic.images[0] ? [clinic.images[0]] : [],
    },
  };
}

export default async function ClinicDetailPage({ params }: PageProps) {
  const { id } = await params;
  const clinic = clinicsData.find((c) => c.id === id);

  if (!clinic) {
    notFound();
  }

  // 해당 병원의 리뷰만 필터링
  const reviews = reviewsData.filter(
    (r) => r.type === 'clinic' && r.targetId === clinic.id
  ) as Review[];

  return (
    <main className={styles.page}>
      <Header />

      {/* Hero Image */}
      <div className={styles.hero}>
        <Image
          src={clinic.images[0]}
          alt={clinic.name}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.container}>
        <article className={styles.content}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.specialties}>
              {clinic.specialties.map((specialty) => (
                <Badge key={specialty} variant="light">{specialty}</Badge>
              ))}
            </div>

            <h1>{clinic.name}</h1>

            <div className={styles.rating}>
              <Star size={18} fill="currentColor" />
              <span className={styles.ratingValue}>{clinic.rating}</span>
              <span className={styles.reviewCount}>리뷰 {clinic.reviewCount}개</span>
            </div>

            <p className={styles.description}>{clinic.description}</p>
          </header>

          {/* 기본 정보 */}
          <section className={styles.info}>
            <h2>병원 정보</h2>
            <ul>
              <li>
                <MapPin size={18} />
                <span>{clinic.address}</span>
              </li>
              <li>
                <Phone size={18} />
                <span>{clinic.phone}</span>
              </li>
              {clinic.hours && (
                <li>
                  <Clock size={18} />
                  <span>{clinic.hours}</span>
                </li>
              )}
            </ul>
          </section>

          {/* 의료진 */}
          {clinic.doctors && clinic.doctors.length > 0 && (
            <section className={styles.doctors}>
              <h2>의료진</h2>
              <div className={styles.doctorList}>
                {clinic.doctors.map((doctor, index) => (
                  <div key={index} className={styles.doctorCard}>
                    <div className={styles.doctorAvatar}>
                      <Users size={24} />
                    </div>
                    <div className={styles.doctorInfo}>
                      <span className={styles.doctorName}>{doctor.name}</span>
                      <span className={styles.doctorTitle}>{doctor.title}</span>
                      <span className={styles.doctorSpecialty}>{doctor.specialty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 시설 */}
          {clinic.facilities && clinic.facilities.length > 0 && (
            <section className={styles.facilities}>
              <h2>편의시설</h2>
              <div className={styles.facilityList}>
                {clinic.facilities.map((facility, index) => (
                  <Badge key={index} variant="light">{facility}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* 갤러리 */}
          {clinic.images.length > 1 && (
            <section className={styles.gallery}>
              <h2>갤러리</h2>
              <div className={styles.galleryGrid}>
                {clinic.images.slice(1).map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <Image
                      src={image}
                      alt={`${clinic.name} 시설 ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 리뷰 */}
          <section className={styles.reviews}>
            <h2>포토 후기</h2>
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

          {/* CTA */}
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
  return clinicsData.map((clinic) => ({
    id: clinic.id,
  }));
}

