import type { IconBackendDefinition, OnClickLinkBackendProps } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { BadgeBackendDefinition } from '../../../core/BadgeAdapter/BadgeAdapter.types';
import type { CollapsibleMenuComponentPartBackendDefinition } from '../CollapsibleMenuAdapter.types';

export type CollapsibleMenuEntryBackendProps = OnClickLinkBackendProps & {
  text: string;
  badge?: BadgeBackendDefinition;
  icon?: IconBackendDefinition;
  componentParts?: CollapsibleMenuComponentPartBackendDefinition[];
};

export type CollapsibleMenuEntryBackendDefinition = SmartFaceBackendComponentPart<
  CollapsibleMenuEntryBackendProps,
  'Entry'
>;

export type CollapsibleMenuEntryAdapterProps = SmartFaceAdapterPropsType<CollapsibleMenuEntryBackendDefinition>;
