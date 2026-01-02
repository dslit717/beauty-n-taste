export interface Restaurant {
  id: string;
  name: string;
  category: 'fine-dining' | 'cafe' | 'dessert' | 'tea' | 'recovery-food';
  cuisine: string[];
  description: string;
  address: string;
  priceRange: number;
  averagePrice: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
  isPhotoSpot: boolean;
  isChefsTable: boolean;
}

export type RestaurantCategory = Restaurant['category'] | 'all';

