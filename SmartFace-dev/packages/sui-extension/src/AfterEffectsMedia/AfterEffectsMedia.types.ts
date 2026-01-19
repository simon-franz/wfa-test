import type { HTMLAttributes } from 'react';

export type AfterEffectsMediaProps = {
  url: string;
  speed?: number;
  loop?: boolean;
  loopStartFrame?: number;
  loopEndFrame?: number;
  paint?: {
    [part in 'path' | 'ellipse' | 'line' | 'polyline']?: {
      stroke?: boolean;
      fill?: boolean;
    };
  };
  alt?: string;
} & HTMLAttributes<HTMLDivElement>;
