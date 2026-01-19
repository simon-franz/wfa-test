import type { HTMLAttributes } from 'react';

import type { TreeGraphEntryData } from '../../TreeGraph.types';

export type TreeNodeButtonProps = Pick<
  TreeGraphEntryData,
  'hasChildEntries' | 'onLoadChildEntries' | 'isExpanded' | 'id' | 'setIsExpanded'
> & {
  onClick: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;
