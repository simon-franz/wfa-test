import type { EmblaCarouselType } from 'embla-carousel';
import { createContext } from 'react';

export type CarouselContext = {
  emblaApi?: EmblaCarouselType;
  currentIndex: number;
  slidesToShow: number;
  scrollSnaps: number[];
  prevDisabled: boolean;
  nextDisabled: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
};

export const CarouselContext = createContext<CarouselContext>({} as CarouselContext);
