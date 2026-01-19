import type { Node } from '@xyflow/react';

import type { TreeGraphEntryUiDataType } from '../TreeGraph.types';

export type ChildNodeProps = {
  allGreyedOut?: boolean;
} & Omit<Node<TreeGraphEntryUiDataType>, 'position'>;
