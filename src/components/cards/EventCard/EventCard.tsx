'use client';

import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Event } from '@/types/community';
import { Badge } from '@/components/ui';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card/Card';
import styles from './EventCard.module.scss';

interface EventCardProps {
  event: Event;
}

const CATEGORY_LABELS: Record<string, string> = {
  discount: '할인',
  campaign: '캠페인',
  collaboration: '콜라보',
};

export function EventCard({ event }: EventCardProps) {
  const formatDate = (start: string, end: string) => {
    if (start === end) return start;
    return `${start} ~ ${end}`;
  };

  return (
    <Card href={`/community/events/${event.id}`}>
      <CardImage
        src={event.imageUrl}
        alt={event.title}
        aspectRatio="landscape"
        badge={<Badge>{CATEGORY_LABELS[event.category]}</Badge>}
      />
      <CardContent>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
        <div className={styles.date}>
          <Calendar size={14} />
          <span>{formatDate(event.startDate, event.endDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

