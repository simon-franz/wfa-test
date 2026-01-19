import { AccordionItem } from '@hrworks/sui-core/Accordion/Item/AccordionItem';
import { MISSING_STRING } from '@hrworks/sui-shared';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ComponentMapper, mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import type { AccordionItemAdapterProps } from './AccordionItemAdapter.types';

export const AccordionItemAdapter = observer(
  ({
    title = MISSING_STRING,
    icon,
    componentChildren,
    onBeforeInitialExpand,
    onBeforeExpand,
    onAfterInitialExpand,
    onAfterExpand,
    onCollapse,
    ...otherProps
  }: AccordionItemAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const handleAsyncEvent = async (event: SfEventType) => {
      await applyEvents(event);
    };

    const handleEvent = (event: SfEventType) => {
      applyEvents(event);
    };

    const _icon = icon && <ComponentMapper smartFaceComponent={icon} />;
    const _onBeforeInitialExpand = onBeforeInitialExpand && (() => handleAsyncEvent(onBeforeInitialExpand));
    const _onBeforeExpand = onBeforeExpand && (() => handleAsyncEvent(onBeforeExpand));
    const _onAfterInitialExpand = onAfterInitialExpand && (() => handleEvent(onAfterInitialExpand));
    const _onAfterExpand = onAfterExpand && (() => handleEvent(onAfterExpand));
    const _onCollapse = onCollapse && (() => handleEvent(onCollapse));
    const children = mapSmartFaceComponentsToAdapters(componentChildren);

    return (
      <AccordionItem
        title={title}
        icon={_icon}
        onBeforeInitialExpand={_onBeforeInitialExpand}
        onBeforeExpand={_onBeforeExpand}
        onAfterInitialExpand={_onAfterInitialExpand}
        onAfterExpand={_onAfterExpand}
        onCollapse={_onCollapse}
        children={children}
        {...otherProps}
      />
    );
  },
);
