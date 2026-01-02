export interface Treatment {
  id: string;
  name: string;
  category: 'laser' | 'injection' | 'lifting' | 'skincare';
  description: string;
  benefits: string[];
  duration: string;
  recoveryTime: string;
  painLevel: number;
  priceRange: {
    min: number;
    max: number;
  };
  imageUrl: string;
  recommendedCycle?: string;
  cautions?: string[];
  sideEffects?: string[];
  afterCare?: string[];
  relatedRestaurants?: string[];
}

export interface Doctor {
  name: string;
  title: string;
  specialty: string;
}

export interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  images: string[];
  isBnTSelection: boolean;
  hours?: string;
  selectionReason?: string;
  doctors?: Doctor[];
  facilities?: string[];
}

export interface Review {
  id: string;
  type: 'treatment' | 'clinic';
  targetId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  helpful: number;
  isVerified: boolean;
}

export type TreatmentCategory = Treatment['category'] | 'all';

