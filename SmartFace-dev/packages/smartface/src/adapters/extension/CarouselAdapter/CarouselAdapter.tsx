import Carousel from '@hrworks/sui-extension/Carousel';
import { observer } from 'mobx-react';

import { mapSmartFaceComponentPartsToAdapter } from '../../../main/components/ComponentMapper/mapSmartFaceComponentPartsToAdapters';
import type { CarouselAdapterProps } from './CarouselAdapter.types';
import { CarouselItemAdapter } from './CarouselItem/CarouselItemAdapter';

export const CarouselAdapter = observer(({ items, ...otherProps }: CarouselAdapterProps) => {
  const children = mapSmartFaceComponentPartsToAdapter(CarouselItemAdapter, items);

  return <Carousel children={children} {...otherProps} />;
});
