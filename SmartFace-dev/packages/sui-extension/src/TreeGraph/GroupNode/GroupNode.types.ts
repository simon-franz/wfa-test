import type { Node } from '@xyflow/react';

import type { TreeGraphEntryData } from '../TreeGraph.types';

type Data = TreeGraphEntryData & {
  groupedEntries: TreeGraphEntryData[];
};

export type GroupedNodeProps = Omit<Node<Data>, 'position'>;
