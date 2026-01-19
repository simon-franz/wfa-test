import type { ResponsiveAttribute } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type CarouselProps = {
  autoplay?: 'none' | 'slow' | 'medium' | 'fast';
  loop?: boolean;
  showArrows?: boolean;
  prevArrow?: ReactNode;
  nextArrow?: ReactNode;
  showPagination?: boolean;
  slidesToShow?: ResponsiveAttribute<number>;
} & HTMLAttributes<HTMLDivElement>;
