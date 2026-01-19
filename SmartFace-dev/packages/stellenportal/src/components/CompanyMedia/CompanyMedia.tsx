'use client';

import Image from '@hrworks/sui-core/Image';
import Carousel, { CarouselItem } from '@hrworks/sui-extension/Carousel';

import type { CompanyMediaProps } from './CompanyMedia.types';

export const CompanyMedia = ({ settings, ...otherProps }: CompanyMediaProps) => (
  <Carousel slidesToShow={4} {...otherProps}>
    {settings.companyPictures?.map(
      (picture) =>
        picture.url && (
          <CarouselItem key={picture.url}>
            <Image src={picture.url} alt="Company Picture" /> {/* TODO: Add translation or alt from API */}
          </CarouselItem>
        ),
    )}
  </Carousel>
);
