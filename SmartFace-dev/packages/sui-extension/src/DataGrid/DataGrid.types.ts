import type { JustifyContent } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode } from 'react';

export type DataGridColumn =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'singleSelect' // Not yet implemented
  | 'image'
  | 'componentChildren'
  | 'template';

export type ColumnDefinition = {
  id: string;
  type: DataGridColumn;
  label?: string;
  columnsMenuLabel?: string;
  data?: (props?: object) => ReactNode;
  resizable?: boolean;
  minWidth?: number;
  width?: number;
  maxWidth?: number;
  visible?: boolean;
  sortable?: boolean;
  pinnable?: boolean;
  hideable?: boolean;
  justifyContent?: JustifyContent;
  primarySortDirection?: 'asc' | 'desc';
};

export type Row = {
  id: string;
  rows?: Row[];
  data: unknown;
  onClick?: (event?: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => void;
};

type ControlledProps<T extends Record<string, unknown>> = T & {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (newValue: T[K]) => void;
} & {
  [K in keyof T as T[K] extends undefined ? `on${Capitalize<string & K>}Change` : never]?: (newValue: T[K]) => void;
};

type ControlledAsyncProps<T extends Record<string, unknown>> = T & {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (newValue: T[K]) => Promise<void>;
} & {
  [K in keyof T as T[K] extends undefined ? `on${Capitalize<string & K>}Change` : never]?: (newValue: T[K]) => void;
};

export type DataGridProps<T extends Row = Row> = {
  rows: T[];
  onFetchRows?: () => Promise<void>;
  fullHeight?: boolean;
  pagination?: boolean;
  selectableRows?: boolean;
  clientSideSort?: boolean;
  virtualizationOverscan?: number;
  loadingAnimation?: boolean;
  toolbar?:
    | boolean
    | {
        columns?: boolean;
        filter?: boolean;
        density?: boolean;
        export?:
          | boolean
          | {
              csv?: boolean;
              pdf?: boolean;
              xlsx?: boolean;
            };
      };
} & ControlledProps<{
  columnDefinitions: ColumnDefinition[];
  disableUnsort?: boolean;
  pinnedColumns: {
    left?: string[];
    right?: string[];
  };
  density?: 'low' | 'medium' | 'high';
}> &
  ControlledAsyncProps<{
    sorts: {
      id: string;
      direction?: 'asc' | 'desc';
    }[];
  }> &
  HTMLAttributes<HTMLDivElement>;
