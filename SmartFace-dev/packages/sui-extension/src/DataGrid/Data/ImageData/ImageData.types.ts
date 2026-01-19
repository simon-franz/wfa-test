import type { ImgHTMLAttributes } from 'react';

export type ImageDataProps = {
  value: unknown;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'children' | 'src'>;
