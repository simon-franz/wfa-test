import { OnboardingController, type OnboardingControllerProps } from '@hrworks/sui-extension/OnboardingController';
import { observer } from 'mobx-react';
import { type MouseEvent, useContext } from 'react';

import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { Update } from '../../../../types/shared/BackendResponseType/UpdateTypes';
import { OnboardingControllerItemAdapter } from './Item/OnboardingControllerItemAdapter';
import type { OnboardingControllerAdapterProps } from './OnboardingControllerAdapter.types';

export const OnboardingControllerAdapter = observer(
  ({
    id,
    activeItemSfId,
    onBeforeNavigation,
    preventNavigation,
    onAfterNavigation,
    items = [],
    logo = {},
    ...otherProps
  }: OnboardingControllerAdapterProps) => {
    const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

    const setActiveItemId = async (targetSfId: OnboardingControllerProps['activeItemId']) => {
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

    const { onClick, ...otherLogoProps } = logo;

    const onLogoClick = (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      applyEvents(onClick!);
    };

    const _logo = { onClick: onClick && onLogoClick, ...otherLogoProps };
    const _items = OnboardingControllerItemAdapter(items);

    return (
      <OnboardingController
        id={id}
        activeItemId={activeItemSfId}
        logo={_logo}
        items={_items}
        setActiveItemId={setActiveItemId}
        {...otherProps}
      />
    );
  },
);
