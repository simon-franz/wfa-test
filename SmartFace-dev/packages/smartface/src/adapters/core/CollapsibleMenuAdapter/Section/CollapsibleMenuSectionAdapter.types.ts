import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { CollapsibleMenuEntryBackendDefinition } from '../Entry/CollapsibleMenuEntryAdapter.types';

export type CollapsibleMenuSectionBackendProps = {
  title: string;
  componentParts: CollapsibleMenuEntryBackendDefinition[];
};

export type CollapsibleMenuSectionBackendDefinition = SmartFaceBackendComponentPart<
  CollapsibleMenuSectionBackendProps,
  'Section'
>;

export type CollapsibleMenuSectionAdapterProps = SmartFaceAdapterPropsType<CollapsibleMenuSectionBackendDefinition>;
