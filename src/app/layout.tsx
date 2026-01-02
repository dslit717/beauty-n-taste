import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { BottomNav } from '@/components/layout/BottomNav';
import './globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'Beauty N Taste',
    template: '%s | Beauty N Taste',
  },
  description: '뷰티와 미식이 만나는 프리미엄 라이프스타일 플랫폼',
  keywords: ['뷰티', '미식', '시술', '맛집', '스킨케어', '피부과'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Beauty N Taste',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <div className="app-container">
            {children}
          </div>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
