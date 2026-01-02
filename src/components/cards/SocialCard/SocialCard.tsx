'use client';

import Image from 'next/image';
import { Play, Heart, Eye, Users } from 'lucide-react';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui';
import { SocialContent } from '@/types/social';
import styles from './SocialCard.module.scss';

interface SocialCardProps {
  content: SocialContent;
}

export function SocialCard({ content }: SocialCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
    return num.toString();
  };

  // 인플루언서 카드
  if (content.platform === 'influencer') {
    return (
      <a href={content.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <Card>
          <CardImage
            src={content.thumbnailUrl}
            alt={content.title}
            aspectRatio="landscape"
            badge={content.category && <Badge>{content.category}</Badge>}
          />
          <CardContent>
            <CardTitle>{content.title}</CardTitle>
            <CardDescription>{content.description}</CardDescription>
            <div className={styles.meta}>
              <span className={styles.platform}>{content.author}</span>
              {content.followers && (
                <span className={styles.stat}>
                  <Users size={14} />
                  {formatNumber(content.followers)} 팔로워
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    );
  }

  // 일반 소셜 카드
  return (
    <a href={content.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
      <Card>
        <CardImage
          src={content.thumbnailUrl}
          alt={content.title}
          aspectRatio="landscape"
          badge={
            content.platform === 'youtube' && (
              <div className={styles.playBadge}>
                <Play size={14} fill="white" />
              </div>
            )
          }
        />
        <CardContent>
          <CardTitle>{content.title}</CardTitle>
          {content.description && (
            <CardDescription>{content.description}</CardDescription>
          )}
          <div className={styles.meta}>
            <span className={styles.author}>{content.author}</span>
            <div className={styles.stats}>
              {content.views !== undefined && (
                <span className={styles.stat}>
                  <Eye size={14} />
                  {formatNumber(content.views)}
                </span>
              )}
              {content.likes !== undefined && (
                <span className={styles.stat}>
                  <Heart size={14} />
                  {formatNumber(content.likes)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
