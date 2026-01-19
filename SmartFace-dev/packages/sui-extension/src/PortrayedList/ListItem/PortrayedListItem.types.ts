import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type PortrayedListItemProps = {
  title: string;
  subtitle?: string;
  media?: ReactNode;
} & OnClickLinkProps &
  Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> &
  Pick<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'onClick'>;
