import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { PortrayedListItemBackendDefinition } from './ListItem/PortrayedListItemAdapter.types';

export type PortrayedListBackendProps = {
  items: PortrayedListItemBackendDefinition[];
  selectedItemSfId?: string;
  hoverable?: boolean;
  lineStyle?: 'solid' | 'none' | 'dotted' | 'dashed';
};

export type PortrayedListBackendDefinition = SmartFaceBackendComponent<'PortrayedList', PortrayedListBackendProps>;

export type PortrayedListAdapterProps = SmartFaceAdapterPropsType<PortrayedListBackendDefinition>;
