import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { ListItemBackendDefinition } from './Item/ListItemAdapter.types';

export type ListBackendProps = {
  items: ListItemBackendDefinition[];
  selectedItemSfId?: string;
  hoverable?: boolean;
  lineStyle?: 'solid' | 'dotted' | 'dashed' | 'none';
};

export type ListBackendDefinition = SmartFaceBackendComponent<'List', ListBackendProps>;

export type ListAdapterProps = SmartFaceAdapterPropsType<ListBackendDefinition>;
