import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';
import type { TreeNodeVariant } from '@hrworks/types/shared/UiTypes';

import type {
  SmartFaceAdapterPropsType,
  SmartFaceBackendComponent,
  SmartFaceBackendComponentPart,
} from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type TreeGraphBackendProps = {
  entries: TreeGraphEntryBackendDefinition[];
  fullHeight?: boolean;
  showMiniMap?: boolean;
  showControls?: boolean;
  leafGroupingThreshold?: number | boolean;
  exportLimit?: number;
  exportServiceUrl?: string;
  controlsChildren?: SmartFaceComponentsType[];
};

export type TreeGraphBackendDefinition = SmartFaceBackendComponent<'TreeGraph', TreeGraphBackendProps>;

export type TreeGraphAdapterProps = SmartFaceAdapterPropsType<TreeGraphBackendDefinition>;

export type TreeGraphEntryBackendProps = {
  entries?: TreeGraphEntryBackendDefinition[];
  title?: string;
  subtitle?: string;
  subsubtitle?: string;
  imageSrc?: string;
  isExpanded?: boolean;
  onLoadChildEntries?: SfEventType;
  onClick?: SfEventType;
  variant?: TreeNodeVariant;
  dataGuideId?: string;
};

export type TreeGraphEntryBackendDefinition = SmartFaceBackendComponentPart<TreeGraphEntryBackendProps>;
