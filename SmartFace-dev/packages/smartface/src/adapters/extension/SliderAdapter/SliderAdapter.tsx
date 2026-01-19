import Slider from '@hrworks/sui-extension/Slider';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { WriteUpdate } from '../../../types/shared/BackendResponseType/UpdateTypes';
import type { SliderAdapterProps } from './SliderAdapter.types.js';

export const SliderAdapter = observer(({ id, onValueChange, ...otherProps }: SliderAdapterProps) => {
  const { applyEvents, applyUpdates, queueBackendPatches } = useContext(SmartFaceContext);

  const _onValueChange = (value: number) => {
    const update: WriteUpdate = {
      targetSfId: id,
      operation: 'write',
      path: 'props.value',
      value,
    };
    applyUpdates([update]);
    queueBackendPatches(id, [update]);
  };

  const _onValueChangeFinished = onValueChange && (() => applyEvents(onValueChange));

  return <Slider onValueChange={_onValueChange} onValueChangeFinished={_onValueChangeFinished} {...otherProps} />;
});
