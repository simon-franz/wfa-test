import type { HTMLAttributes } from 'react';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  direction?: 'horizontal' | 'vertical';
};
