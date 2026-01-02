import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '커뮤니티',
  description: '실제 시술 후기, 맛집 리뷰, 이벤트 정보를 확인하세요.',
  keywords: ['시술후기', '맛집리뷰', '이벤트', '할인'],
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}

