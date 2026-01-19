import getId from '@hrworks/sui-shared/functions/getId';

import { defaultImage } from '../Image/ImageDefaultProps';
import type { CarouselBackendProps } from '@hrworks/smartface/adapters/extension/CarouselAdapter/CarouselAdapter.types';

export const carouselDefaultProps: CarouselBackendProps = {
  autoplay: 'none',
  loop: true,
  showArrows: true,
  showPagination: true,
  slidesToShow: 1,
  items: [
    {
      sfId: getId(),
      props: {
        componentChildren: [defaultImage()],
      },
    },
    {
      sfId: getId(),
      props: {
        componentChildren: [defaultImage()],
      },
    },
    {
      sfId: getId(),
      props: {
        componentChildren: [defaultImage()],
      },
    },
  ],
};
