import { ControlledAccordion } from '@hrworks/sui-core/Accordion';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { WriteUpdate } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { AccordionAdapterProps } from './AccordionAdapter.types';
import { AccordionItemAdapter } from './Item/AccordionItemAdapter';
import type { AccordionProps } from '@hrworks/sui-core/Accordion/Accordion.types';

export const AccordionAdapter = observer(
  ({ id, expandedItemSfIds = [], items, ...otherProps }: AccordionAdapterProps) => {
    const { queueBackendPatches, applyUpdates } = useContext(SmartFaceContext);

    const _updateExpandedItemIds = (expandedItemIds: AccordionProps['expandedItemIds']) => {
      const update: WriteUpdate = {
        targetSfId: id,
        operation: 'write',
        path: 'props.expandedItemSfIds',
        value: expandedItemIds,
      };
      queueBackendPatches(id, [update]);
      applyUpdates([update]);
    };

    const children = mapSmartFaceComponentPartsToAdapter(AccordionItemAdapter, items);

    return (
      <ControlledAccordion
        id={id}
        expandedItemIds={expandedItemSfIds}
        updateExpandedItemIds={_updateExpandedItemIds}
        children={children}
        {...otherProps}
      />
    );
  },
);
