import { useResponsiveProp } from '@hrworks/sui-shared/hooks/useResponsiveProp';
import useEmblaCarousel from 'embla-carousel-react';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';

import { S } from './Carousel.styles';
import type { CarouselProps } from './Carousel.types';
import { CarouselContext } from './CarouselContext';
import { NavigationButton } from './NavigationButton/NavigationButton';
import { PaginationButton } from './PaginationButton/PaginationButton';

const autoplaySpeedConfig = {
  none: 0,
  slow: 5000,
  medium: 3000,
  fast: 2000,
};

export const Carousel = observer(
  ({
    autoplay = 'none',
    loop: _loop,
    showArrows = true,
    showPagination = true,
    slidesToShow,
    prevArrow,
    nextArrow,
    children,
    ...otherProps
  }: CarouselProps) => {
    const isAutoplayEnabled = autoplay !== 'none';
    const loop = isAutoplayEnabled ? true : _loop;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);

    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const autoplaySpeedMs = autoplaySpeedConfig[autoplay];

    const _slidesToShow = useResponsiveProp(slidesToShow) || 1;

    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop,
      align: 'start',
      slidesToScroll: 1,
      skipSnaps: true,
    });

    const handleUserInteraction = useCallback(() => {
      if (!isAutoplayEnabled) return;
      setIsAutoplayPaused(true);
    }, [isAutoplayEnabled]);

    useEffect(() => {
      if (isAutoplayPaused && isAutoplayEnabled) {
        const timeout = setTimeout(() => {
          setIsAutoplayPaused(false);
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }, [isAutoplayPaused, isAutoplayEnabled]);

    useEffect(() => {
      if (emblaApi && isAutoplayEnabled && !isAutoplayPaused && autoplaySpeedMs > 0) {
        const interval = setInterval(() => {
          if (emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollTo(0);
          }
        }, autoplaySpeedMs);

        return () => clearInterval(interval);
      }
    }, [emblaApi, isAutoplayEnabled, autoplaySpeedMs, isAutoplayPaused]);

    const scrollPrev = useCallback(() => {
      if (emblaApi) {
        emblaApi.scrollPrev();
        handleUserInteraction();
      }
    }, [emblaApi, handleUserInteraction]);

    const scrollNext = useCallback(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
        handleUserInteraction();
      }
    }, [emblaApi, handleUserInteraction]);

    const scrollTo = useCallback(
      (index: number) => {
        if (emblaApi) {
          emblaApi.scrollTo(index);
          handleUserInteraction();
        }
      },
      [emblaApi, handleUserInteraction],
    );

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
      setPrevDisabled(!emblaApi.canScrollPrev());
      setNextDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;

      onSelect();
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
      emblaApi.on('pointerDown', handleUserInteraction);

      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
        emblaApi.off('pointerDown', handleUserInteraction);
      };
    }, [emblaApi, onSelect, handleUserInteraction]);

    const contextValue = {
      emblaApi,
      currentIndex,
      scrollSnaps,
      slidesToShow: _slidesToShow,
      prevDisabled,
      nextDisabled,
      scrollPrev,
      scrollNext,
      scrollTo,
    };

    return (
      <CarouselContext.Provider value={contextValue}>
        <S.CarouselContainer {...otherProps}>
          {prevArrow || (showArrows && <NavigationButton direction="prev" />)}
          <S.CarouselContent ref={emblaRef}>
            <S.ItemWrapper>{children}</S.ItemWrapper>
          </S.CarouselContent>
          {showPagination && <PaginationButton />}
          {nextArrow || (showArrows && <NavigationButton direction="next" />)}
        </S.CarouselContainer>
      </CarouselContext.Provider>
    );
  },
);
