import type { IconBackendDefinition, OnClickLinkBackendProps } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { DropdownMenuComponentPartBackendDefinition } from '../DropdownMenuAdapter.types';

type DropdownMenuEntryBackendProps = OnClickLinkBackendProps & {
  text: string;
  icon?: IconBackendDefinition;
  componentParts?: DropdownMenuComponentPartBackendDefinition[];
};

export type DropdownMenuEntryBackendDefinition = SmartFaceBackendComponentPart<DropdownMenuEntryBackendProps, 'Entry'>;

export type DropdownMenuEntryAdapterProps = SmartFaceAdapterPropsType<DropdownMenuEntryBackendDefinition>;
