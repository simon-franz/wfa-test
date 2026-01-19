import type { HTMLAttributeAnchorTarget, HTMLAttributes } from 'react';

export type ListItemProps = {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
} & Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> &
  Pick<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'onClick'>;
