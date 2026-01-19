import type { Edge, Node } from '@xyflow/react';

type TreeGraphEntryDataType = {
  title?: string;
  subtitle?: string;
  subsubtitle?: string;
  imageSrc?: string;
  isExpanded?: boolean;
  variant?: TreeNodeVariantType;
  dataGuideId?: string;
};

export type TreeGraphEntryUiDataType = TreeGraphEntryDataType & {
  onLoadChildEntries?: () => void;
  onClick: () => void;
  onCollapseEntries: () => void;
  setIsExpanded: (id: string, value: boolean) => void;
  hasChildEntries?: boolean;
  id: string;
};

export type TreeNodeVariantType = 'default' | 'greyedOut' | 'highlighted';

// Define the expected structure of data
export type TreeGraphServerData = {
  format: 'export-as-png' | 'export-as-jpeg' | 'export-as-svg' | 'export-as-pdf' | 'print';
  nodes: Node[];
  edges: Edge[];
  highlightColor?: string;
  background?: string;
  width?: number;
  height?: number;
};
