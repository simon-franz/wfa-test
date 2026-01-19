import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type NestedChecklistEntryProps = {
  id: string;
  label: string;
  checked: boolean;
  expanded: boolean;
  isFirstLevelWithNoEntries?: boolean;
  checkDescendantsOnFetchEntries: boolean;
  size?: Size;
  onFetchEntries?: () => Promise<void>;
  onCheckedChange?: (value: boolean) => void;
  onExpandedChange?: (value: boolean) => void;
  onCheckAllRecursively?: (value: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;
