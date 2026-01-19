import FortuneWheel from '@hrworks/sui-extension/FortuneWheel';
import { observer } from 'mobx-react';
import { useCallback, useContext } from 'react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { WriteUpdate } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { FortuneWheelAdapterProps } from './FortuneWheelAdapter.types';
import { FortuneWheelItemAdapter } from './Item/FortuneWheelItemAdapter';

export const FortuneWheelAdapter = observer(
  ({ id, onSpinComplete, items = [], ...otherProps }: FortuneWheelAdapterProps) => {
    const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

    const _onSpinComplete = useCallback(
      (chosenId: string) => {
        const update: WriteUpdate = {
          targetSfId: id,
          operation: 'write',
          path: 'props.value',
          value: chosenId,
        };
        queueBackendPatches(id, [update]);
        applyUpdates([update]);
        onSpinComplete && applyEvents(onSpinComplete);
      },
      [applyEvents, applyUpdates, id, onSpinComplete, queueBackendPatches],
    );

    const children = mapSmartFaceComponentPartsToAdapter(FortuneWheelItemAdapter, items);

    return <FortuneWheel onSpinComplete={_onSpinComplete} children={children} id={id} {...otherProps} />;
  },
);
