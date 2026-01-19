'use client';

import Image from '@hrworks/sui-core/Image';

import { S } from './Hero.styles';
import type { HeroProps } from './Hero.types';

// TODO: Consider using hero from SUI
export const Hero = ({ children, imageSrc, ...otherProps }: HeroProps) => {
  const src =
    imageSrc ||
    'https://hrworks-private-images.s3-eu-west-1.amazonaws.com/10060/jobApplicationServerInfoPicture/DB74EED2D22D93EEEB8A.png';

  return (
    <S.Container {...otherProps}>
      <Image src={src} alt="Company image" />
      {children && (
        <S.Content>
          <S.Title>{children}</S.Title>
        </S.Content>
      )}
    </S.Container>
  );
};
