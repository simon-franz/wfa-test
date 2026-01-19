import type { TreeNodeVariant } from '@hrworks/types/shared/UiTypes';
import type { Node } from '@xyflow/react';
import type { HTMLAttributes, ReactNode } from 'react';

export type TreeGraphProps = {
  entries: TreeGraphEntry[];
  controlsChildren?: ReactNode;
  fullHeight?: boolean;
  showMiniMap?: boolean;
  showControls?: boolean;
  leafGroupingThreshold?: number | boolean;
  exportLimit?: number;
  exportServiceUrl?: string;
} & HTMLAttributes<HTMLDivElement>;

export type TreeGraphEntry = {
  id: string;
  entries?: TreeGraphEntry[];
  onLoadChildEntries?: () => Promise<void>;
  setIsExpanded?: (id: string, value: boolean) => void;
  isGrouped?: boolean;
  groupedEntries?: TreeGraphEntry[];
} & TreeGraphEntryData;

export type TreeGraphEntryData = {
  title?: string;
  subtitle?: string;
  subsubtitle?: string;
  imageSrc?: string;
  isExpanded?: boolean;
  variant?: TreeNodeVariant;
  dataGuideId?: string;
  hasChildEntries?: boolean;
  onLoadChildEntries?: () => void;
  onClick?: () => void;
  onCollapseEntries?: () => void;
  setIsExpanded?: (id: string, value: boolean) => void;
  id: string;
};

export type ExportAction = 'export-as-png' | 'export-as-jpeg' | 'export-as-svg' | 'export-as-pdf' | 'print';

type Handle = {
  type: string;
  position: string;
  x: number;
  y: number;
};

export type NodeWithHandles = Node & {
  handles: Handle[];
  width: number;
  height: number;
};
