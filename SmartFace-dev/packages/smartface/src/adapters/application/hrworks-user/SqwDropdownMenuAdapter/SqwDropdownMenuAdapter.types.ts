import type { Presentation } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../../../types/shared/BackendTypes';
import type { SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { BadgeBackendDefinition } from '../../../core/BadgeAdapter/BadgeAdapter.types';
import type { DropdownMenuDividerBackendDefinition } from './DropdownMenuDividerAdapter/DropdownMenuDividerAdapter.types';
import type { DropdownMenuEntryBackendDefinition } from './DropdownMenuEntryAdapter/DropdownMenuEntryAdapter.types';
import type { DropdownMenuSectionBackendDefinition } from './DropdownMenuSectionAdapter/DropdownMenuSectionAdapter.types';

export type SqwDropdownMenuBackendProps = {
  componentParts: (
    | DropdownMenuDividerBackendDefinition
    | DropdownMenuEntryBackendDefinition
    | DropdownMenuSectionBackendDefinition
  )[];
  presentation?: Presentation | 'collapsibleMenu';
  title?: string;
  badge?: BadgeBackendDefinition;
  icon?: IconBackendDefinition;
};

export type SqwDropdownMenuBackendDefinition = SmartFaceBackendComponent<
  'SqwDropdownMenu',
  SqwDropdownMenuBackendProps
>;
