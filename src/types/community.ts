export interface CommunityReview {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  type: 'treatment' | 'restaurant' | 'product';
  targetId: string;
  targetName: string;
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  category: 'discount' | 'campaign' | 'collaboration';
  isActive: boolean;
}

export type CommunityTab = 'reviews' | 'events';

