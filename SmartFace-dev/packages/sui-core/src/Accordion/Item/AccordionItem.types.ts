import type { Color } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type AccordionItemProps = {
  title: string;
  color?: Color;
  preventInitialExpand?: boolean;
  preventExpand?: boolean;
  icon?: ReactNode;
  onBeforeInitialExpand?: () => Promise<void>;
  onBeforeExpand?: () => Promise<void>;
  onAfterInitialExpand?: () => void;
  onAfterExpand?: () => void;
  onCollapse?: () => void;
} & HTMLAttributes<HTMLDivElement>;
