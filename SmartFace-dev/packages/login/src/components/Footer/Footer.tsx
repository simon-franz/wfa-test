'use client';

import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';

import { S } from './Footer.styles';
import type { FooterProps } from './Footer.types';

export const Footer = (props: FooterProps) => {
  const t = useTranslations('Footer');

  return (
    <S.FooterContainer {...props}>
      {/* TODO: Remove underline after fn is implemented https://hrworks.atlassian.net/browse/FE-3077 */}
      {/* TODO: focus-visible fix is on the way https://hrworks.atlassian.net/browse/FE-3631 */}
      <Text
        color="primary"
        textAlign="center"
        fontSize="small"
        fontWeight="normal"
        target="_blank"
        href="https://www.hrworks.de/unternehmen/impressum/"
      >
        {t('legalNotice')}
      </Text>
      <S.Separator aria-hidden="true" />
      <Text
        color="primary"
        textAlign="center"
        fontSize="small"
        fontWeight="normal"
        target="_blank"
        href="https://www.hrworks.de/unternehmen/datenschutz/"
      >
        {t('privacyPolicy')}
      </Text>
    </S.FooterContainer>
  );
};
