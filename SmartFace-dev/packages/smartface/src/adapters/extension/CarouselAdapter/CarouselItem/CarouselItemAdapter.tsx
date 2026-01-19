import { CarouselItem } from '@hrworks/sui-extension/Carousel';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentsToAdapters } from '../../../../main/components/ComponentMapper';
import type { CarouselItemAdapterProps } from './CarouselItemAdapter.types';

export const CarouselItemAdapter = observer(({ componentChildren, ...otherProps }: CarouselItemAdapterProps) => {
  const children = mapSmartFaceComponentsToAdapters(componentChildren);

  return <CarouselItem children={children} {...otherProps} />;
});
