import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스토어',
  description: '시술 바우처, 스킨케어 제품, 이너뷰티 아이템을 특별가에 만나보세요.',
  keywords: ['시술바우처', '스킨케어', '콜라겐', '이너뷰티', '뷰티쇼핑'],
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}

