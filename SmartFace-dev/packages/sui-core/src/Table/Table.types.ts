import type { TextAlign } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type VerticalAlign = 'top' | 'middle' | 'bottom' | 'baseline';

export type TableAlignment = {
  horizontalAlignment?: TextAlign;
  verticalAlignment?: VerticalAlign;
};

type TableColumnDefinitionProps = TableAlignment & {
  columnIndex: number;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
};

export type TableProps = {
  columnDefinitions?: TableColumnDefinitionProps[];
  alternatingColors?: boolean;
  hoverable?: boolean;
  fullHeight?: boolean;
  stickyHead?: boolean;
  layout?: 'auto' | 'fixed';
} & HTMLAttributes<HTMLElement>;
