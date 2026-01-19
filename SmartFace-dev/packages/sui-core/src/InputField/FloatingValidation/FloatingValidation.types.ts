import type { HTMLMotionProps } from 'motion/react';

export type FloatingValidationProps = {
  ref: (node: HTMLElement | null) => void;
  failedFloatingValidationText?: string;
  isVisible?: boolean;
} & HTMLMotionProps<'div'>;
