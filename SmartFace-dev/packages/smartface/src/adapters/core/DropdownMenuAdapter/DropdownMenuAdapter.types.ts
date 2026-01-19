import type { FloatDirection, Presentation } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';
import type { DropdownMenuDividerBackendDefinition } from './Divider/DropdownMenuDividerAdapter.types';
import type { DropdownMenuEntryBackendDefinition } from './Entry/DropdownMenuEntryAdapter.types';
import type { DropdownMenuSectionBackendDefinition } from './Section/DropdownMenuSectionAdapter.types';

export type DropdownMenuComponentPartBackendDefinition =
  | DropdownMenuEntryBackendDefinition
  | DropdownMenuDividerBackendDefinition
  | DropdownMenuSectionBackendDefinition;

export type DropdownMenuBackendProps = {
  trigger: SmartFaceComponentsType;
  componentParts: DropdownMenuComponentPartBackendDefinition[];
  placement?: FloatDirection;
  presentation?: Presentation;
  title?: string;
};

export type DropdownMenuBackendDefinition = SmartFaceBackendComponent<'DropdownMenu', DropdownMenuBackendProps>;

export type DropdownMenuAdapterProps = SmartFaceAdapterPropsType<DropdownMenuBackendDefinition>;
