import type { Node } from '@xyflow/react';

import type { TreeGraphEntryData } from '../TreeGraph.types';

export type TreeNodeProps = Omit<Node<TreeGraphEntryData>, 'position'>;
