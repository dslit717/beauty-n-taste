'use client';

import Image from 'next/image';
import { Star, Heart, User } from 'lucide-react';
import { CommunityReview } from '@/types/community';
import { Badge } from '@/components/ui';
import styles from './CommunityReviewCard.module.scss';

interface CommunityReviewCardProps {
  review: CommunityReview;
}

const TYPE_LABELS: Record<string, string> = {
  treatment: '시술',
  restaurant: '맛집',
  product: '상품',
};

export function CommunityReviewCard({ review }: CommunityReviewCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <User size={18} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{review.userName}</span>
            <span className={styles.date}>{review.createdAt}</span>
          </div>
        </div>
        <Badge>{TYPE_LABELS[review.type]}</Badge>
      </div>

      <div className={styles.target}>
        <span className={styles.targetName}>{review.targetName}</span>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < review.rating ? 'currentColor' : 'none'}
              className={i < review.rating ? styles.filled : styles.empty}
            />
          ))}
        </div>
      </div>

      <p className={styles.content}>{review.content}</p>

      {review.images.length > 0 && (
        <div className={styles.images}>
          {review.images.map((img, idx) => (
            <div key={idx} className={styles.imageWrapper}>
              <Image
                src={img}
                alt={`리뷰 이미지 ${idx + 1}`}
                fill
                className={styles.image}
              />
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button className={styles.likeButton}>
          <Heart size={16} />
          <span>{review.likes}</span>
        </button>
      </div>
    </div>
  );
}

