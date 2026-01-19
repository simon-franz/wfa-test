import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';

import type { SideEffectType } from '../../../types/shared/BackendResponseType/SideEffectTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { ColumnDefinition } from '@hrworks/sui-extension/DataGrid/DataGrid.types';

export type Row = {
  id: string;
  data: unknown;
  rows?: Row[];
  onClick?: SfEventType;
};

type Toolbar =
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

export type DataGridBackendProps<T extends Row = Row> = {
  rows: T[];
  url: string;
  toolbar: Toolbar;
  fullHeight?: boolean;
  pagination?: boolean;
  selectableRows?: boolean;
  clientSideSort?: boolean;
  virtualizationOverscan?: number;
  loadingAnimation?: boolean;
  columnDefinitions?: (Omit<ColumnDefinition, 'data'> & {
    data?: unknown;
  })[];
  disableUnsort?: boolean;
  pinnedColumns: {
    left?: string[];
    right?: string[];
  };
  density: 'low' | 'medium' | 'high';
  sorts: {
    id: string;
    direction?: 'asc' | 'desc';
  }[];
  onFetchRows?: SfEventType;
  onColumnDefinitionsChange?: SfEventType;
  onSortsChange?: SfEventType;
  onPinnedColumnsChange?: SfEventType;
  onDensityChange?: SfEventType;
};

export type DataGridBackendDefinition = SmartFaceBackendComponent<'DataGrid', DataGridBackendProps>;

export type DataGridAdapterProps = SmartFaceAdapterPropsType<DataGridBackendDefinition>;

export type DataGridResponse = {
  data: {
    rows: DataGridAdapterProps['rows'];
  };
  sideEffects?: SideEffectType[];
};
