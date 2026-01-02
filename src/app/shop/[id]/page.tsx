import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Badge, Button } from '@/components/ui';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import productsData from '@/data/products.json';
import styles from './page.module.scss';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = productsData.find((p) => p.id === params.id);
  if (!product) return { title: '상품 정보' };
  
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  'beauty': '뷰티',
  'clinic-voucher': '시술권',
  'taste': '테이스트',
  'inner-beauty': '이너뷰티',
};

export default function ProductDetailPage({ params }: PageProps) {
  const product = productsData.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const discountRate = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.container}>
        <div className={styles.productLayout}>
          {/* 이미지 */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                className={styles.image}
              />
              {(product.isNew || product.isBest) && (
                <div className={styles.badges}>
                  {product.isNew && <Badge>NEW</Badge>}
                  {product.isBest && <Badge>BEST</Badge>}
                </div>
              )}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.rating}>
              <Star size={18} fill="currentColor" />
              <span className={styles.ratingScore}>{product.rating}</span>
              <span className={styles.reviewCount}>({product.reviewCount}개 리뷰)</span>
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* 가격 */}
            <div className={styles.priceSection}>
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

            {/* 태그 */}
            <div className={styles.tags}>
              {product.tags.map((tag) => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>

            {/* 혜택 */}
            <div className={styles.benefits}>
              <div className={styles.benefit}>
                <Truck size={18} />
                <span>무료 배송</span>
              </div>
              <div className={styles.benefit}>
                <Shield size={18} />
                <span>정품 보장</span>
              </div>
              <div className={styles.benefit}>
                <RotateCcw size={18} />
                <span>7일 교환/환불</span>
              </div>
            </div>

            {/* 버튼 */}
            <div className={styles.actions}>
              <Button variant="outline" className={styles.wishButton}>
                <Heart size={20} />
              </Button>
              <Button className={styles.cartButton}>
                <ShoppingCart size={20} />
                <span>장바구니</span>
              </Button>
              <Button className={styles.buyButton}>
                바로 구매
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

