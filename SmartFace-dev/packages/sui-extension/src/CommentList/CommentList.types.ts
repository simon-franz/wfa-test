import type { HTMLAttributes } from 'react';

export type CommentListProps = {
  textUrlMaxLength?: number;
} & HTMLAttributes<HTMLUListElement>;
