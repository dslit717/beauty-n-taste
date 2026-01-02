import { Treatment } from '@/types/medical';
import { Badge, Card, CardImage, CardContent, CardTitle, CardDescription, CardMeta } from '@/components/ui';
import { Clock, RefreshCw, Activity } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { TREATMENT_CATEGORY_LABELS } from '@/lib/constants';
import styles from './TreatmentCard.module.scss';

interface TreatmentCardProps {
  treatment: Treatment;
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <Card href={`/medical/treatments/${treatment.id}`}>
      <CardImage
        src={treatment.imageUrl}
        alt={treatment.name}
        aspectRatio="landscape"
        badge={<Badge>{TREATMENT_CATEGORY_LABELS[treatment.category]}</Badge>}
      />
      <CardContent>
        <CardTitle>{treatment.name}</CardTitle>
        <p className={styles.description}>{treatment.description}</p>

        <div className={styles.info}>
          <CardMeta>
            <Clock size={14} />
            <span>시술 {treatment.duration}</span>
          </CardMeta>
          <CardMeta>
            <RefreshCw size={14} />
            <span>회복 {treatment.recoveryTime}</span>
          </CardMeta>
          <CardMeta>
            <Activity size={14} />
            <span>
              통증 {'●'.repeat(treatment.painLevel)}{'○'.repeat(5 - treatment.painLevel)}
            </span>
          </CardMeta>
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>
            ₩ {formatPrice(treatment.priceRange.min)} ~
          </span>
        </div>
      </CardContent>
    </Card>
  );
}




