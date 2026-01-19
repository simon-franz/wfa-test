import type { OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type CollapsibleMenuEntryProps = {
  text: string;
  badge?: ReactNode;
  icon?: ReactNode;
} & OnClickLinkProps &
  HTMLAttributes<HTMLElement>;
