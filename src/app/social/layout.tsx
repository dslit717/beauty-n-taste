import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소셜 허브',
  description: '뷰티, 미식 분야 인플루언서들의 유튜브, 인스타그램, 블로그 콘텐츠를 모아보세요.',
  keywords: ['뷰티유튜버', '맛집유튜버', '인플루언서', '뷰티블로그'],
};

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return children;
}




