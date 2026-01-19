import type { HTMLAttributeAnchorTarget, HTMLAttributes } from 'react';

export type BreadcrumbItemProps = {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  underline?: boolean;
} & Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> &
  Pick<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'onClick'>;
