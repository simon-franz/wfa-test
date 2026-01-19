import type { HTMLAttributes } from 'react';

import type { User } from '../../../../App/App.types';

export type UserCardProps = {
  onClick: (userId: string) => void;
  user: User;
  selectedUserId?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'color' | 'onClick'>;
