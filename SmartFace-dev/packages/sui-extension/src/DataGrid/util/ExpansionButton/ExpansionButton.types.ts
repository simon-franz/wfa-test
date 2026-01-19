import type { HTMLAttributes } from 'react';

export type ExpansionButtonProps = {
  expanded?: boolean;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'children'>;
