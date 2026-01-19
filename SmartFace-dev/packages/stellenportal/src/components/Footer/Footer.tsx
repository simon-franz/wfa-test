'use client';

import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';

import { Link } from '../Link';
import { S } from './Footer.styles';
import type { FooterProps } from './Footer.types';

export const Footer = ({ settings, ...otherProps }: FooterProps) => {
  const t = useTranslations('Footer');

  return (
    <S.Container {...otherProps}>
      <S.Inner>
        <S.Top>
          <S.Links>
            {settings?.imprintUrl && (
              <Link href={settings.imprintUrl}>
                <S.Button variant="unstyled">{t('imprint')}</S.Button>
              </Link>
            )}
            {settings?.privacyTermsUrl && (
              <Link href={settings.privacyTermsUrl}>
                <S.Button variant="unstyled">{t('privacy-policy')}</S.Button>
              </Link>
            )}
          </S.Links>
        </S.Top>
        <S.Hr />
        <S.Bottom>
          <Text>{t('powered-by')}</Text>
        </S.Bottom>
      </S.Inner>
    </S.Container>
  );
};
