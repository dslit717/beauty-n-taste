import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { formatDate } from '@/lib/utils';
import articlesData from '@/data/articles.json';
import { ARTICLE_CATEGORY_LABELS } from '@/lib/constants';
import styles from './page.module.scss';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articlesData.find((a) => a.id === params.id);
  if (!article) return { title: '아티클' };
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = articlesData.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.category}>{ARTICLE_CATEGORY_LABELS[article.category]}</span>
          <h1>{article.title}</h1>
          <div className={styles.meta}>
            <span>by {article.author}</span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <article className={styles.content}>
          <p className={styles.excerpt}>{article.excerpt}</p>
          
          <div className={styles.body}>
            <p>{article.content}</p>
            <p>
              시술 후 올바른 식단 관리는 피부 회복에 중요한 역할을 합니다. 
              특히 항산화 성분이 풍부한 음식과 충분한 수분 섭취가 권장됩니다.
            </p>
            <p>
              비타민 C와 E가 풍부한 과일과 채소, 오메가-3 지방산이 풍부한 생선류,
              그리고 단백질이 풍부한 음식을 섭취하면 피부 재생에 도움이 됩니다.
            </p>
            <p>
              반면, 맵고 자극적인 음식, 알코올, 카페인은 시술 후 일정 기간 피하는 것이 좋습니다.
              이러한 음식들은 염증을 악화시키거나 피부 민감도를 높일 수 있습니다.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    id: article.id,
  }));
}

