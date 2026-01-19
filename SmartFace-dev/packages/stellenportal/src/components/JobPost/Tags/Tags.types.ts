import type { HTMLAttributes } from 'react';

export type TagsProps = {
  tags: (string | undefined)[];
} & HTMLAttributes<HTMLDivElement>;
