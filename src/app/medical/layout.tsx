import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시술 백과',
  description: '피코레이저, 스킨부스터, 보톡스 등 다양한 시술 정보와 B&T 선정 프리미엄 클리닉을 만나보세요.',
  keywords: ['피코레이저', '스킨부스터', '보톡스', '피부시술', '피부과'],
};

export default function MedicalLayout({ children }: { children: React.ReactNode }) {
  return children;
}

