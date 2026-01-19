import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { CollapsibleMenuEntryBackendDefinition } from './Entry/CollapsibleMenuEntryAdapter.types';
import type { CollapsibleMenuSectionBackendDefinition } from './Section/CollapsibleMenuSectionAdapter.types';

export type CollapsibleMenuComponentPartBackendDefinition =
  | CollapsibleMenuSectionBackendDefinition
  | CollapsibleMenuEntryBackendDefinition;

export type CollapsibleMenuBackendProps = {
  expandedEntrySfIds: string[];
  componentParts: CollapsibleMenuComponentPartBackendDefinition[];
  multiple?: boolean;
  showDepthIndicator?: boolean;
  activeEntrySfId?: string;
};

export type CollapsibleMenuBackendDefinition = SmartFaceBackendComponent<
  'CollapsibleMenu',
  CollapsibleMenuBackendProps
>;

export type CollapsibleMenuAdapterProps = SmartFaceAdapterPropsType<CollapsibleMenuBackendDefinition>;
