export interface SocialContent {
  id: string;
  platform: 'youtube' | 'instagram' | 'blog' | 'influencer';
  title: string;
  description?: string;
  thumbnailUrl: string;
  url: string;
  author: string;
  authorImage?: string;
  publishedAt: string;
  views?: number;
  likes?: number;
  followers?: number;
  category?: string;
}

export type SocialTab = 'influencer' | 'youtube' | 'instagram' | 'blog';

