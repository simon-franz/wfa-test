import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { DropdownMenuDividerBackendDefinition } from '../DropdownMenuDividerAdapter/DropdownMenuDividerAdapter.types';
import type { DropdownMenuEntryBackendDefinition } from '../DropdownMenuEntryAdapter/DropdownMenuEntryAdapter.types';

type DropdownMenuSectionBackendProps = {
  title: string;
  componentParts: (DropdownMenuEntryBackendDefinition | DropdownMenuDividerBackendDefinition)[];
};

export type DropdownMenuSectionBackendDefinition = SmartFaceBackendComponentPart<
  DropdownMenuSectionBackendProps,
  'Section'
>;

export type DropdownMenuSectionAdapterProps = SmartFaceAdapterPropsType<DropdownMenuSectionBackendDefinition>;
