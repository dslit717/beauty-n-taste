import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '테이스트',
  description: '시술 후 가기 좋은 맛집, 유명 셰프 레스토랑, 사진 찍기 좋은 공간을 큐레이션합니다.',
  keywords: ['맛집', '레스토랑', '카페', '파인다이닝', '데이트코스'],
};

export default function TasteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

