'use client';

import Text from '@hrworks/sui-core/Text';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { LanguageSelect } from '../LanguageSelect';
import { Link } from '../Link';
import { LinkButton } from '../LinkButton';
import { S } from './Header.styles';
import type { HeaderClientProps } from './Header.types';

export const HeaderClient = ({ logoPicture, secondRow, post, loading, ...otherProps }: HeaderClientProps) => {
  const t = useTranslations();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!secondRow) {
      return;
    }

    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setShowDetails(scrollPosition > 100);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [secondRow]);

  return (
    <S.Container {...otherProps}>
      <S.Row>
        <Link href={logoPicture?.clickUrl || '/'}>
          {!loading && (
            <S.Logo
              src={
                logoPicture?.url ||
                'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/HRW_Logo_ohne_Claim_Farbe_360x65px.png'
              }
              alt="Logo"
            />
          )}
        </Link>
        <LanguageSelect />
      </S.Row>
      {secondRow && post && (
        <S.SecondRow
          style={
            showDetails
              ? { top: S.componentConfig.headerHeight, visibility: 'visible' }
              : { top: 0, visibility: 'hidden' }
          }
        >
          <S.JobDetails>
            <Text fontWeight="bold">{post.postOffer.displayName}</Text>
            <Text>
              {post.postOffer.workingTimeModelKey && t(`Job.workingTimeModelKey.${post.postOffer.workingTimeModelKey}`)}
            </Text>
            <Text>
              {post.postOffer.placeOfWorkTypeKey && t(`Job.placeOfWorkTypeKey.${post.postOffer.placeOfWorkTypeKey}`)}
            </Text>
          </S.JobDetails>
          <S.ActionButtons>
            <Button variant="subtle">{t('Main.share')}</Button>
            <LinkButton variant="subtle" corner="rounded" href={`${post.postOffer.id}/apply`}>
              {t('Main.apply')}
            </LinkButton>
          </S.ActionButtons>
        </S.SecondRow>
      )}
    </S.Container>
  );
};
