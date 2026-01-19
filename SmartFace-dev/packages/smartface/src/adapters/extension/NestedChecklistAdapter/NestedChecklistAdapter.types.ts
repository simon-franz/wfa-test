import type { SfEventType } from '@hrworks/types/shared/SfEventTypes/SfEventType';
import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { NestedChecklistEntryBackendDefinition } from './NestedChecklistEntry/NestedChecklistEntryAdapter.types';

export type NestedChecklistBackendProps = {
  size?: Size;
  entries?: NestedChecklistEntryBackendDefinition[];
  onFetchEntries?: SfEventType;
};

export type NestedChecklistBackendDefinition = SmartFaceBackendComponent<
  'NestedChecklist',
  NestedChecklistBackendProps
>;

export type NestedChecklistAdapterProps = SmartFaceAdapterPropsType<NestedChecklistBackendDefinition>;
