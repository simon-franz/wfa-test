import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { AccordionItemBackendDefinition } from './Item/AccordionItemAdapter.types';

export type AccordionBackendProps = {
  items: AccordionItemBackendDefinition[];
  expandCollapseIcon?: 'arrow' | 'plus-minus';
  expandedItemSfIds: string[];
  itemSpacing?: boolean;
  multiple?: boolean;
};

export type AccordionBackendDefinition = SmartFaceBackendComponent<'Accordion', AccordionBackendProps>;

export type AccordionAdapterProps = SmartFaceAdapterPropsType<AccordionBackendDefinition>;
