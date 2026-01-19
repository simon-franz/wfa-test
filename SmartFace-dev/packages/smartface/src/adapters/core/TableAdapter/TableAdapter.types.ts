import type { TextAlign } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { TableDataRowBackendDefinition } from './DataRow/TableDataRowAdapter.types';
import type { TableHeaderRowBackendDefinition } from './HeaderRow/TableHeaderRowAdapter.types';
import type { VerticalAlign } from '@hrworks/sui-core/Table/Table.types';

type TableAlignment = {
  horizontalAlignment?: TextAlign;
  verticalAlignment?: VerticalAlign;
};

type TableColumnConfig = TableAlignment & {
  columnIndex: number;
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
};

export type TableBackendProps = {
  headerRows?: TableHeaderRowBackendDefinition[];
  dataRows?: TableDataRowBackendDefinition[];
  columnDefinitions?: TableColumnConfig[];
  alternatingColors?: boolean;
  hoverable?: boolean;
  fullHeight?: boolean;
  stickyHead?: boolean;
  layout?: 'auto' | 'fixed';
};

export type TableBackendDefinition = SmartFaceBackendComponent<'Table', TableBackendProps>;

export type TableAdapterProps = SmartFaceAdapterPropsType<TableBackendDefinition>;
