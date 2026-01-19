import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';

export type DropdownMenuDividerBackendDefinition = SmartFaceBackendComponentPart<Record<string, never>, 'Divider'>;

export type DropdownMenuDividerAdapterProps = SmartFaceAdapterPropsType<DropdownMenuDividerBackendDefinition>;
