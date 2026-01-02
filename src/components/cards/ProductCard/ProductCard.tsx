'use client';

import { Star } from 'lucide-react';
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui';
import { Product } from '@/types/shop';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountRate = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Card href={`/shop/${product.id}`}>
      <CardImage
        src={product.imageUrl}
        alt={product.name}
        aspectRatio="landscape"
        badge={
          (product.isNew || product.isBest) && (
            <>
              {product.isNew && <Badge>NEW</Badge>}
              {product.isBest && <Badge>BEST</Badge>}
            </>
          )
        }
      />
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        
        <div className={styles.priceRow}>
          {discountRate > 0 && (
            <span className={styles.discount}>{discountRate}%</span>
          )}
          <span className={styles.price}>
            {product.price.toLocaleString()}원
          </span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
        </div>
        
        <div className={styles.rating}>
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className={styles.reviewCount}>({product.reviewCount})</span>
        </div>
      </CardContent>
    </Card>
  );
}
