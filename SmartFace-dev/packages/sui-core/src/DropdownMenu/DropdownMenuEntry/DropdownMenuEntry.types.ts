import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type DropdownMenuEntryProps = OnClickLinkProps & {
  submenu?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
} & HTMLAttributes<HTMLElement>;
