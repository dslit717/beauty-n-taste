import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { WeeklyBest } from '@/components/home/WeeklyBest';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { MagazinePreview } from '@/components/home/MagazinePreview';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Header />
      <HeroSection />
      <WeeklyBest />
      <FeaturedSection />
      <MagazinePreview />
    </main>
  );
}
