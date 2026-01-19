import type { HTMLAttributes } from 'react';

export type ImageCropperProps = {
  url: string;
  name: string;
} & HTMLAttributes<HTMLDivElement>;
