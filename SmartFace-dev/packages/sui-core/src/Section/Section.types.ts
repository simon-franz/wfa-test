import type { HTMLAttributes } from 'react';

import type { TitleBaseProps } from '../Title/Title.types';

export type SectionProps = {
  collapsible?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  divider?: boolean;
  breakTitleChildrenWithTitle?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
} & TitleBaseProps &
  HTMLAttributes<Omit<HTMLElement, 'title'>>;
