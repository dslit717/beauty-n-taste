import { Clinic } from '@/types/medical';
import { Badge, Card, CardImage, CardContent, CardTitle, CardDescription, CardMeta } from '@/components/ui';
import { MapPin, Star, Award } from 'lucide-react';
import styles from './ClinicCard.module.scss';

interface ClinicCardProps {
  clinic: Clinic;
}

export function ClinicCard({ clinic }: ClinicCardProps) {
  const badges = (
    <>
      {clinic.isBnTSelection && (
        <Badge>추천</Badge>
      )}
    </>
  );

  return (
    <Card href={`/medical/clinics/${clinic.id}`}>
      <CardImage
        src={clinic.images[0]}
        alt={clinic.name}
        aspectRatio="landscape"
        badge={badges}
      />
      <CardContent>
        <div className={styles.header}>
          <CardTitle>{clinic.name}</CardTitle>
          <div className={styles.rating}>
            <Star size={14} fill="currentColor" />
            <span>{clinic.rating}</span>
            <span className={styles.reviewCount}>({clinic.reviewCount})</span>
          </div>
        </div>

        <CardDescription>{clinic.description}</CardDescription>

        <CardMeta>
          <MapPin size={14} />
          <span>{clinic.address}</span>
        </CardMeta>
      </CardContent>
    </Card>
  );
}

