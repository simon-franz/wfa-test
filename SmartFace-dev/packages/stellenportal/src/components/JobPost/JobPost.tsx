'use client';

import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import { useTranslations } from 'next-intl';

import { CardBody, CardHeader } from '../Card';
import { HTML } from '../Html';
import { Link } from '../Link';
import { S } from './JobPost.styles';
import type { JobPostProps } from './JobPost.types';
import { Tags } from './Tags';

export const JobPost = ({ post, postOffer, customerCompanyNumber, ...otherProps }: JobPostProps) => {
  const t = useTranslations('Job');
  const { postDescriptions } = post;
  const { id, displayName, careerLevelKey, workingTimeModelKey, permanentEstablishments, placeOfWorkTypeKey } =
    postOffer;

  const tagList = [
    careerLevelKey && t(`carreerLevelKey.${careerLevelKey}`),
    workingTimeModelKey && t(`workingTimeModelKey.${workingTimeModelKey}`),
  ];

  return (
    <Link href={`/${customerCompanyNumber}/${id}`} {...otherProps}>
      <S.Card>
        <CardHeader>
          <S.Title headerTag="h2">{displayName}</S.Title>
        </CardHeader>
        <CardBody>
          <S.Content>
            <S.Main>
              <S.Description>
                <HTML html={postDescriptions?.tasks?.description || ''} />
              </S.Description>
              <Tags tags={tagList} />
            </S.Main>
            <S.Sidebar>
              {permanentEstablishments?.map((permanentEstablishment, index) => (
                <S.SidebarElement key={index}>
                  <MaterialDesignIcon name="location_on" /> {permanentEstablishment?.address?.city}
                </S.SidebarElement>
              ))}
              {placeOfWorkTypeKey && (
                <S.SidebarElement>
                  <MaterialDesignIcon name="home" /> {t(`placeOfWorkTypeKey.${placeOfWorkTypeKey}`)}
                </S.SidebarElement>
              )}
            </S.Sidebar>
          </S.Content>
        </CardBody>
      </S.Card>
    </Link>
  );
};
