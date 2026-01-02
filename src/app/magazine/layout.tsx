import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '매거진',
  description: '뷰티와 테이스트의 페어링, 시술 후 케어 가이드 등 라이프스타일 콘텐츠를 만나보세요.',
  keywords: ['뷰티매거진', '시술후기', '애프터케어', '뷰티팁'],
};

export default function MagazineLayout({ children }: { children: React.ReactNode }) {
  return children;
}

