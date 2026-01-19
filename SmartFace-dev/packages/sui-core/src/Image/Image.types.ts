import type { Corner } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

export type ImageProps = {
  src: string;
  alt?: string;
  aspectRatio?: string;
  corner?: Exclude<Corner, 'pill'> | 'circular';
  fullWidth?: boolean;
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  fallbackConfig?: {
    fallbackSrc?: string;
    numberOfRetries?: number | 'infinite';
    retryInterval?: number;
  };
} & HTMLAttributes<HTMLImageElement>;
