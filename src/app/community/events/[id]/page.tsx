import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Badge, Button } from '@/components/ui';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import eventsData from '@/data/events.json';
import styles from './page.module.scss';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const event = eventsData.find((e) => e.id === params.id);
  if (!event) return { title: '이벤트' };
  
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  discount: '할인',
  campaign: '캠페인',
  collaboration: '콜라보',
};

export default function EventDetailPage({ params }: PageProps) {
  const event = eventsData.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  const formatDate = (start: string, end: string) => {
    if (start === end) return start;
    return `${start} ~ ${end}`;
  };

  // 남은 일수 계산
  const today = new Date();
  const endDate = new Date(event.endDate);
  const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <Image
          src={event.imageUrl}
          alt={event.title}
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
              <Badge>{CATEGORY_LABELS[event.category]}</Badge>
              {event.isActive && daysLeft > 0 && (
                <span className={styles.daysLeft}>D-{daysLeft}</span>
              )}
            </div>
            <h1>{event.title}</h1>
          </header>

          <div className={styles.dateInfo}>
            <Calendar size={18} />
            <span>{formatDate(event.startDate, event.endDate)}</span>
          </div>

          <section className={styles.description}>
            <h2>이벤트 상세</h2>
            <p>{event.description}</p>
            
            {/* 추가 상세 내용 (실제로는 데이터에서 가져옴) */}
            <div className={styles.details}>
              <h3>참여 방법</h3>
              <ol>
                <li>B&T 회원가입 또는 로그인</li>
                <li>이벤트 페이지에서 참여하기 버튼 클릭</li>
                <li>해당 조건 충족 시 자동 응모 완료</li>
              </ol>

              <h3>유의사항</h3>
              <ul>
                <li>본 이벤트는 B&T 회원만 참여 가능합니다.</li>
                <li>중복 참여는 불가합니다.</li>
                <li>당첨자 발표는 이벤트 종료 후 7일 이내 개별 연락드립니다.</li>
                <li>부정한 방법으로 참여 시 당첨이 취소될 수 있습니다.</li>
              </ul>
            </div>
          </section>

          <div className={styles.actions}>
            <Button className={styles.participateButton}>
              <span>참여하기</span>
              <ArrowRight size={18} />
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
}

