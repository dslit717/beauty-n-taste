'use client';

import clsx from 'clsx';
import styles from './CategoryFilter.module.scss';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div className={styles.filter}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={clsx(styles.button, value === cat.id && styles.active)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

