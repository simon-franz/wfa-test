import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type NavItemProps = {
  text?: string;
} & OnClickLinkProps &
  Omit<HTMLAttributes<HTMLButtonElement>, 'color'>;
