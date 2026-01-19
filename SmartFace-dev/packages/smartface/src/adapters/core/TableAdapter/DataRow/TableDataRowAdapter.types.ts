import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { TableDataBackendDefinition } from './Data/TableDataAdapter.types';
import type { TableAlignment } from '@hrworks/sui-core/Table/Table.types';

export type TableDataRowBackendProps = TableAlignment & {
  cells: TableDataBackendDefinition[];
  onClick?: SfEventType;
};

export type TableDataRowBackendDefinition = SmartFaceBackendComponentPart<TableDataRowBackendProps>;

export type TableDataRowAdapterProps = SmartFaceAdapterPropsType<TableDataRowBackendDefinition>;
