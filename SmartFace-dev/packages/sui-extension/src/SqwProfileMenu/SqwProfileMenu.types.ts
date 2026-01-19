import type { HTMLAttributes, ReactNode } from 'react';

export type SqwProfileMenuProps = {
  portrait: ReactNode;
  username?: string;
  email?: string;
  onPortraitAction?: () => void;
} & HTMLAttributes<HTMLDivElement>;
