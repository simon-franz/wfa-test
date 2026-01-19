import type { HTMLAttributes, ReactNode } from 'react';

export type CommentListItemProps = {
  signature: string;
  text: string;
  timestamp?: string;
  toolbarChildren?: ReactNode;
} & HTMLAttributes<HTMLLIElement>;
