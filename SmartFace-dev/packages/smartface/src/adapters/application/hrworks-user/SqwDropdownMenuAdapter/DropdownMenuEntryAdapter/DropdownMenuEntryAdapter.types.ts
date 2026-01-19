import type { IconBackendDefinition, OnClickLinkBackendProps } from '../../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { BadgeBackendDefinition } from '../../../../core/BadgeAdapter/BadgeAdapter.types';
import type { SqwDropdownMenuBackendProps } from '../SqwDropdownMenuAdapter.types';

type DropdownMenuEntryBackendProps = {
  text: string;
  badge?: BadgeBackendDefinition;
  icon?: IconBackendDefinition;
  componentParts?: SqwDropdownMenuBackendProps['componentParts'];
} & OnClickLinkBackendProps;

export type DropdownMenuEntryBackendDefinition = SmartFaceBackendComponentPart<DropdownMenuEntryBackendProps, 'Entry'>;

export type DropdownMenuEntryAdapterProps = SmartFaceAdapterPropsType<DropdownMenuEntryBackendDefinition>;
