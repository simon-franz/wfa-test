import type { HTMLMotionProps } from 'motion/react';

export type BlockUIProps = {
  isOpen: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children'>;
