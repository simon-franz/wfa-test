import type { HTMLAttributes } from 'react';

export type MaterialDesignIconProps = {
  name: string;
  variant?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
} & HTMLAttributes<SVGSVGElement>;
