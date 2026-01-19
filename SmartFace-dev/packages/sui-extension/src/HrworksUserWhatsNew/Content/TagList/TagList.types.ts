import type { HTMLAttributes } from 'react';

export type TagListProps = {
  tags: string[];
} & HTMLAttributes<HTMLUListElement>;
