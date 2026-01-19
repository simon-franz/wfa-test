import {
  ControlledVerticalNavigation,
  type ControlledVerticalNavigationProps,
} from '@hrworks/sui-extension/VerticalNavigation';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { Update } from '../../../../types/shared/BackendResponseType/UpdateTypes';
import { VerticalNavigationItemAdapter } from './Item/VerticalNavigationItemAdapter';
import type { VerticalNavigationAdapterProps } from './VerticalNavigationAdapter.types';

export const VerticalNavigationAdapter = observer(
  ({
    id,
    activeItemSfId,
    onBeforeNavigation,
    preventNavigation,
    onAfterNavigation,
    items = [],
    ...otherProps
  }: VerticalNavigationAdapterProps) => {
    const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

    const setActiveItemId = async (targetSfId: ControlledVerticalNavigationProps['activeItemId']) => {
      if (onBeforeNavigation) {
        const beforeEventsAndFrontendData = onBeforeNavigation.map((event) => ({
          ...event,
          frontendEventData: { sourceSfId: activeItemSfId, targetSfId },
        }));
        await applyEvents(beforeEventsAndFrontendData);
      }
      if (!preventNavigation) {
        const update: Update = {
          operation: 'write',
          targetSfId: id,
          path: 'props.activeItemSfId',
          value: targetSfId,
        };
        applyUpdates([update]);
        queueBackendPatches(id, [update]);
        onAfterNavigation && applyEvents(onAfterNavigation);
      }
    };

    const _items = VerticalNavigationItemAdapter(items);

    return (
      <ControlledVerticalNavigation
        id={id}
        activeItemId={activeItemSfId}
        items={_items}
        setActiveItemId={setActiveItemId}
        {...otherProps}
      />
    );
  },
);
