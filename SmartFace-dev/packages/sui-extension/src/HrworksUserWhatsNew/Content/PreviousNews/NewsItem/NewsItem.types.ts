import type { HTMLAttributes } from 'react';

export type NewsItemProps = {
  title?: string;
  date?: string;
  tags?: string[];
  contentSrc?: string;
} & HTMLAttributes<HTMLElement>;
