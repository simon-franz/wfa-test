import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../../types/SmartFaceComponentsType';
import type { TableAlignment } from '@hrworks/sui-core/Table/Table.types';

export type TableDataBackendProps = TableAlignment & {
  componentChildren?: SmartFaceComponentsType[];
  onClick?: SfEventType;
};

export type TableDataBackendDefinition = SmartFaceBackendComponentPart<TableDataBackendProps>;

export type TableDataAdapterProps = SmartFaceAdapterPropsType<TableDataBackendDefinition>;
