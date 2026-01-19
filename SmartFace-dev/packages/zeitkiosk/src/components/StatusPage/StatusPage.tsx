'use client';
import Button from '@hrworks/sui-core/Button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { S } from './StatusPage.styles';
import type { StatusPageProps } from './StatusPage.types';

// TODO: Consider Removing this component and using the one from smartface instead.
export const StatusPage = ({ title, subtitle, redirectButton, ...otherProps }: StatusPageProps) => {
  const t = useTranslations('statusPage');

  return (
    <S.Container {...otherProps}>
      <S.Content>
        <S.Title>{t('title')}</S.Title>
        <S.SubTitle>{t('subtitle')}</S.SubTitle>
        {redirectButton && (
          <S.ButtonWrapper>
            <Link href={redirectButton.href}>
              <Button>{redirectButton.title}</Button>
            </Link>
          </S.ButtonWrapper>
        )}
      </S.Content>
    </S.Container>
  );
};
