# Next.js + SCSS 프로젝트 템플릿

---

## 🚀 초기 설정

```bash
npx create-next-app@latest . --typescript --app --src-dir --no-tailwind
npm install sass clsx lucide-react
```

---

## 📁 폴더 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.scss
│   ├── not-found.tsx
│   ├── api/
│   └── [page]/
│       ├── page.tsx
│       ├── page.module.scss
│       └── [id]/
│
├── components/
│   ├── layout/
│   │   └── Header/
│   │       ├── index.ts
│   │       ├── Header.tsx
│   │       └── Header.module.scss
│   │
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── index.ts
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.scss
│   │   └── Card/
│   │       ├── index.ts
│   │       ├── Card.tsx
│   │       └── Card.module.scss
│   │
│   └── [domain]/
│
├── contexts/
│
├── lib/
│   ├── constants/
│   ├── hooks/
│   └── utils.ts
│
├── styles/
│   └── abstracts/
│       ├── _variables.scss
│       └── _mixins.scss
│
└── types/
```

---

## 🎨 SCSS 디자인 시스템

### `_variables.scss`

```scss
// Colors
$primary: #3b82f6;

$gray-50: #fafafa;
$gray-100: #f5f5f5;
$gray-200: #e5e5e5;
$gray-300: #d4d4d4;
$gray-500: #737373;
$gray-600: #525252;
$gray-700: #404040;
$gray-900: #171717;

$white: #ffffff;
$black: #000000;

// Typography
$font-family: 'Pretendard', -apple-system, sans-serif;

// Breakpoints
$bp-sm: 640px;
$bp-md: 768px;
$bp-lg: 1024px;

// Shadow
$shadow-md: 0 1px 3px rgba(0, 0, 0, 0.08);
```

### `_mixins.scss`

```scss
@use './variables' as *;

// Responsive
@mixin sm { @media (min-width: $bp-sm) { @content; } }
@mixin md { @media (min-width: $bp-md) { @content; } }
@mixin lg { @media (min-width: $bp-lg) { @content; } }

// Container
@mixin container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  @include lg { padding: 0 2rem; }
}

// Utilities
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin line-clamp($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@mixin transition($properties...) {
  transition-property: $properties;
  transition-duration: 200ms;
  transition-timing-function: ease;
}
```

---

## 📄 기본 파일

### `globals.scss`

```scss
@use '@/styles/abstracts/variables' as *;

*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: $font-family;
  color: $gray-900;
  background-color: $white;
}

button { 
  font-family: inherit; 
  cursor: pointer; 
  border: none; 
  background: none; 
}

a { 
  color: inherit; 
  text-decoration: none; 
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}
```

### `layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: { default: '프로젝트명', template: '%s | 프로젝트명' },
  description: '프로젝트 설명',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

### `lib/utils.ts`

```typescript
import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

---

## 🧩 공통 UI 컴포넌트

### Button

```tsx
// components/ui/Button/Button.tsx
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(styles.button, styles[variant], styles[size], className)} {...props}>
      {children}
    </button>
  );
}
```

```scss
// components/ui/Button/Button.module.scss
@use '@/styles/abstracts/variables' as *;
@use '@/styles/abstracts/mixins' as *;

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  @include transition(background-color);

  &:disabled { opacity: 0.5; cursor: not-allowed; }

  &.primary {
    background: $primary;
    color: $white;
    &:hover:not(:disabled) { background: darken($primary, 8%); }
  }

  &.outline {
    border: 1px solid $gray-300;
    color: $gray-700;
    &:hover:not(:disabled) { background: $gray-50; }
  }

  &.sm { height: 2rem; padding: 0 0.75rem; }
  &.md { height: 2.5rem; padding: 0 1rem; }
  &.lg { height: 3rem; padding: 0 1.5rem; }
}
```

```ts
// components/ui/Button/index.ts
export { default } from './Button';
```

---

### Card

```tsx
// components/ui/Card/Card.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.scss';

interface CardProps { href?: string; children: React.ReactNode; }

export function Card({ href, children }: CardProps) {
  const Wrapper = href ? Link : 'div';
  return <Wrapper href={href || ''} className={styles.card}>{children}</Wrapper>;
}

export function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.imageWrapper}>
      <Image src={src} alt={alt} fill className={styles.image} />
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className={styles.content}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.title}>{children}</h3>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className={styles.description}>{children}</p>;
}
```

```scss
// components/ui/Card/Card.module.scss
@use '@/styles/abstracts/variables' as *;
@use '@/styles/abstracts/mixins' as *;

.card {
  display: block;
  background: $white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: $shadow-md;
  @include transition(transform, box-shadow);

  &:hover { transform: translateY(-2px); }
}

.imageWrapper {
  position: relative;
  aspect-ratio: 4/3;
  background: $gray-100;
}

.image { object-fit: cover; }

.content { padding: 1rem; }

.title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 0.875rem;
  color: $gray-600;
  @include line-clamp(2);
}
```

```ts
// components/ui/Card/index.ts
export { Card, CardImage, CardContent, CardTitle, CardDescription } from './Card';
```

---

## 🎯 사용 예시

### Button
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md">저장</Button>
<Button variant="outline">취소</Button>
```

### Card
```tsx
import { Card, CardImage, CardContent, CardTitle, CardDescription } from '@/components/ui/Card';

<Card href="/products/1">
  <CardImage src="/image.jpg" alt="상품" />
  <CardContent>
    <CardTitle>상품명</CardTitle>
    <CardDescription>상품 설명입니다.</CardDescription>
  </CardContent>
</Card>
```

---

## 📝 네이밍 컨벤션

| 유형 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 | PascalCase | `Button.tsx` |
| 스타일 | 컴포넌트.module.scss | `Button.module.scss` |
| 훅 | use 접두사 | `useFilters.ts` |
| 상수 | UPPER_SNAKE | `MAX_COUNT` |

---

## ✅ 체크리스트

- [ ] Next.js + SCSS 설치
- [ ] 폴더 구조 생성
- [ ] 디자인 시스템 (`_variables`, `_mixins`)
- [ ] 기본 레이아웃 (Header)
- [ ] 공통 UI (Button, Card)