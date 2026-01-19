import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../../types/SmartFaceComponentsType';
import type { TableAlignment } from '@hrworks/sui-core/Table/Table.types';

export type TableHeaderBackendProps = TableAlignment & {
  componentChildren: SmartFaceComponentsType[];
};

export type TableHeaderBackendDefinition = SmartFaceBackendComponentPart<TableHeaderBackendProps>;

export type TableHeaderAdapterProps = SmartFaceAdapterPropsType<TableHeaderBackendDefinition>;
