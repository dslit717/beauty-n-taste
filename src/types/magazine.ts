export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'pairing' | 'after-care' | 'trend';
  author: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  readTime: number;
}

export type ArticleCategory = Article['category'] | 'all';

