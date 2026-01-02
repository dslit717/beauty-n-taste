export interface Product {
  id: string;
  name: string;
  category: 'beauty' | 'clinic-voucher' | 'taste' | 'inner-beauty';
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBest?: boolean;
}

export type ProductCategory = Product['category'] | 'all';
export type ProductTab = 'all' | 'beauty-clinic' | 'taste-inner';

