import type { ResponsiveAttribute } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { CarouselItemBackendDefinition } from './CarouselItem/CarouselItemAdapter.types';

export type CarouselBackendProps = {
  autoplay?: 'none' | 'slow' | 'medium' | 'fast';
  loop?: boolean;
  showArrows?: boolean;
  showPagination?: boolean;
  slidesToShow?: ResponsiveAttribute<number>;
  items?: CarouselItemBackendDefinition[];
};

export type CarouselBackendDefinition = SmartFaceBackendComponent<'Carousel', CarouselBackendProps>;

export type CarouselAdapterProps = SmartFaceAdapterPropsType<CarouselBackendDefinition>;
