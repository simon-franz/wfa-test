import type { Size } from '@hrworks/types/shared/UiTypes';
import type { ReactNode } from 'react';

export type NestedChecklistProps = {
  size?: Size;
  onFetchEntries?: () => Promise<void>;
  children: ReactNode;
};
