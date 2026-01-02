import { Article } from '@/types/magazine';
import { Badge, Card, CardImage, CardContent, CardTitle, CardDescription, CardMeta } from '@/components/ui';
import { ARTICLE_CATEGORY_LABELS } from '@/lib/constants';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card href={`/magazine/${article.id}`}>
      <CardImage
        src={article.imageUrl}
        alt={article.title}
        aspectRatio="wide"
        badge={<Badge>{ARTICLE_CATEGORY_LABELS[article.category]}</Badge>}
      />
      <CardContent>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.excerpt}</CardDescription>

        <div className={styles.metaRow}>
          <CardMeta>
            <span>by {article.author}</span>
          </CardMeta>
        </div>
      </CardContent>
    </Card>
  );
}




