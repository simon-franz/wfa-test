import type { HTMLAttributes } from 'react';

export type CollapsibleMenuProps = {
  activeEntryId?: string;
  multiple?: boolean;
  showDepthIndicator?: boolean;
} & HTMLAttributes<HTMLUListElement>;

export type ControlledCollapsibleMenuProps = {
  expandedEntryIds: string[];
  updateActiveEntryId: (activeEntryId: ControlledCollapsibleMenuProps['activeEntryId']) => void;
  updateExpandedEntryIds: (expandedEntryIds: ControlledCollapsibleMenuProps['expandedEntryIds']) => void;
} & CollapsibleMenuProps;
