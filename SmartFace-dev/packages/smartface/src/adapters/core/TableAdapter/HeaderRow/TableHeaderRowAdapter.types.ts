import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { TableHeaderBackendDefinition } from './Header/TableHeaderAdapter.types';
import type { TableAlignment } from '@hrworks/sui-core/Table/Table.types';

export type TableHeaderRowBackendProps = TableAlignment & {
  cells: TableHeaderBackendDefinition[];
};

export type TableHeaderRowBackendDefinition = SmartFaceBackendComponentPart<TableHeaderRowBackendProps>;

export type TableHeaderRowAdapterProps = SmartFaceAdapterPropsType<TableHeaderRowBackendDefinition>;
