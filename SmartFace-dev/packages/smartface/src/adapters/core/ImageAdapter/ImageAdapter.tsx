import Image from '@hrworks/sui-core/Image';
import { observer } from 'mobx-react';
import { type KeyboardEvent, type MouseEvent, useContext } from 'react';

import type { ImageAdapterProps } from '../../../adapters/core/ImageAdapter/ImageAdapter.types';
import { SmartFaceContext } from '../../../main/components/SmartFaceContext';

export const ImageAdapter = observer(({ src = '', onClick, ...otherProps }: ImageAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);

  const _onClick =
    onClick &&
    ((event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      event.stopPropagation();
      applyEvents(onClick);
    });

  return <Image src={src} onClick={_onClick} {...otherProps} />;
});
