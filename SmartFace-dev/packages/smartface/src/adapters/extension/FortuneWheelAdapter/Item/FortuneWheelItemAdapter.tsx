import FortuneWheelItem from '@hrworks/sui-extension/FortuneWheel/FortuneWheelItem/FortuneWheelItem';
import { observer } from 'mobx-react';

import { ComponentMapper } from '../../../../main/components/ComponentMapper';
import type { FortuneWheelItemAdapterProps } from './FortuneWheelitemAdapter.types';

export const FortuneWheelItemAdapter = observer(({ media, ...otherProps }: FortuneWheelItemAdapterProps) => {
  const _media = media && <ComponentMapper smartFaceComponent={media} />;

  return <FortuneWheelItem media={_media} {...otherProps} />;
});
