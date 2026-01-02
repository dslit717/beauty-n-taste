import { Restaurant } from '@/types/taste';
import { Badge, Card, CardImage, CardContent, CardTitle, CardDescription, CardMeta } from '@/components/ui';
import { MapPin, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { RESTAURANT_CATEGORY_LABELS } from '@/lib/constants';
import styles from './RestaurantCard.module.scss';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card href={`/taste/${restaurant.id}`}>
      <CardImage
        src={restaurant.images[0]}
        alt={restaurant.name}
        aspectRatio="landscape"
        badge={<Badge>{RESTAURANT_CATEGORY_LABELS[restaurant.category]}</Badge>}
      />
      <CardContent>
        <div className={styles.header}>
          <CardTitle>{restaurant.name}</CardTitle>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" />
            <span>{restaurant.rating}</span>
            <span className={styles.reviewCount}>({restaurant.reviewCount})</span>
          </div>
        </div>

        <CardDescription>{restaurant.description}</CardDescription>

        <CardMeta>
          <MapPin size={14} />
          <span>{restaurant.address}</span>
        </CardMeta>

        <div className={styles.tags}>
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>
            ₩ {formatPrice(restaurant.averagePrice)} ~
          </span>
        </div>
      </CardContent>
    </Card>
  );
}




