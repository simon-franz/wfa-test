import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type DropdownMenuEntryProps = {
  submenu?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
} & OnClickLinkProps &
  HTMLAttributes<HTMLElement>;
