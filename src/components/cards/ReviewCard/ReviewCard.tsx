import Image from 'next/image';
import { Review } from '@/types/medical';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import styles from './ReviewCard.module.scss';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{review.userName}</span>
          {review.isVerified && (
            <span className={styles.verified}>
              <CheckCircle size={12} />
              인증됨
            </span>
          )}
        </div>
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
          {review.images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                fill
                sizes="120px"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.date}>{review.createdAt}</span>
        <button className={styles.helpful}>
          <ThumbsUp size={14} />
          <span>도움됨 {review.helpful}</span>
        </button>
      </div>
    </article>
  );
}




