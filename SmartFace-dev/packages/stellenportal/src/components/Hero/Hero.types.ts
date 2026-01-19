import type { HTMLAttributes, ReactNode } from 'react';

export type HeroProps = {
  children?: ReactNode;
  imageSrc?: string;
} & HTMLAttributes<HTMLDivElement>;
