import type { HTMLAttributes } from 'react';

export type WaypointProps = {
  onEnter?: () => Promise<void>;
  onIntersection?: () => Promise<void>;
  onExit?: () => void;
  rootMargin?: string;
  repeatOnEnter?: boolean;
} & HTMLAttributes<HTMLDivElement>;
