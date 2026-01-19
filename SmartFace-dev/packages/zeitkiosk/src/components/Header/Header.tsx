'use client';

import { useMediaQuery } from '@hrworks/design-system';
import { useIsClient } from '@hrworks/sui-shared';
import { useTranslations } from 'next-intl';

import { CurrentDateAndTime } from '../CurrentDateAndTime';
import { S } from './Header.styles';
import type { HeaderProps } from './Header.types';

// TODO: Get terminal name from API
export const Header = ({ terminalName = 'Terminalname', ...otherProps }: HeaderProps) => {
  const t = useTranslations('header');
  const isLargeDevice = useMediaQuery('isLargeDevice');
  const isClient = useIsClient();

  return (
    <S.Container {...otherProps}>
      <S.LogoWrapper>
        {isClient && (
          <S.Logo
            src={
              isLargeDevice
                ? 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/HRW_Logo_ohne_Claim_Farbe.png'
                : // TODO: Replace with production-ready logo when uploaded to bucket
                  'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/favicons/favicon-512.png'
            }
            alt={t('logoAltText')}
          />
        )}
      </S.LogoWrapper>
      <CurrentDateAndTime />
      <S.TitleWrapper>
        <S.Title>{terminalName}</S.Title>
      </S.TitleWrapper>
    </S.Container>
  );
};
