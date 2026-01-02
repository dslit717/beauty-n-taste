'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = '검색...' }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onChange(localValue);
  }, [localValue, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange(localValue);
    }
  }, [localValue, onChange]);

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <Search size={18} className={styles.icon} />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
      />
    </form>
  );
}





