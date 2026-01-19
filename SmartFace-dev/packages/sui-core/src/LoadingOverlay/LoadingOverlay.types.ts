import type { HTMLAttributes } from 'react';

type Intensity = 'off' | 'low' | 'medium' | 'high';

export type LoadingOverlayProps = {
  loading: boolean;
  type?: 'spinner';
  blurIntensity?: Intensity;
  fadeIntensity?: Intensity;
} & HTMLAttributes<HTMLDivElement>;
