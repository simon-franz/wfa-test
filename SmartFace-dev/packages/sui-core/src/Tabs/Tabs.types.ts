import type { Gap } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type TabsProps = {
  fullHeight?: boolean;
  contentGap?: Gap;
  defaultSelectedItemId?: string;
  selectedItemId?: string;
  updateSelectedItemId?: (id: string) => void;
} & HTMLAttributes<HTMLElement>;
