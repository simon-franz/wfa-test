import type { Presentation } from '@hrworks/types/shared/UiTypes';
import type { ReactNode } from 'react';

export type SqwDropdownMenuProps = {
  title?: string;
  presentation?: Presentation | 'collapsibleMenu';
  items: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
};
