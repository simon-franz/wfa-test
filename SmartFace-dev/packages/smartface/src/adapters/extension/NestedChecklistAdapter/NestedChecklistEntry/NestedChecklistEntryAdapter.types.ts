import type { SfEventType } from '@hrworks/types/shared/SfEventTypes/SfEventType';
import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';

export type EntryProps = {
  checked: boolean;
  expanded: boolean;
  checkDescendantsOnFetchEntries: boolean;
};

export type NestedChecklistEntryBackendProps = {
  label: string;
  size?: Size;
  entries?: NestedChecklistEntryBackendDefinition[];
  onFetchEntries?: SfEventType;
  isFirstLevelWithNoEntries?: boolean;
  onCheckedChange?: (value: boolean) => void;
  onCheckDescendantsOnFetchEntriesChange?: (value: boolean) => void;
} & EntryProps;

export type NestedChecklistEntryBackendDefinition = SmartFaceBackendComponentPart<NestedChecklistEntryBackendProps>;

export type NestedChecklistEntryAdapterProps = SmartFaceAdapterPropsType<NestedChecklistEntryBackendDefinition>;
