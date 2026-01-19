import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';

type DropdownMenuDividerBackendProps = Record<string, never>;

export type DropdownMenuDividerBackendDefinition = SmartFaceBackendComponentPart<
  DropdownMenuDividerBackendProps,
  'Divider'
>;

export type DropdownMenuDividerAdapterProps = SmartFaceAdapterPropsType<DropdownMenuDividerBackendDefinition>;
