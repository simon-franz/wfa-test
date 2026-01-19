import type { components } from '@hrworks/api-schema';
import { getTranslations } from 'next-intl/server';

import type { Post } from '../types/post';
import type { getPosts } from './getPosts';
import type { SelectOptionProps } from '@hrworks/sui-core/Select/Select.types';

export type SearchOptions = {
  carreerLevel: SelectOptionProps[];
  workingTimeModel: SelectOptionProps[];
  employmentContractType: SelectOptionProps[];
  scopeOfActivities: SelectOptionProps[];
  placeOfWorkType: SelectOptionProps[];
};

const createLocationKey = (establishment: components['schemas']['PermanentEstablishment']) => {
  const { address } = establishment;

  return `${address?.city}_${address?.internationalCountryCode}`;
};

const getUniqueEstablishments = (posts: Post[]) => {
  const uniqueMap = new Map<string, components['schemas']['PermanentEstablishment']>();

  posts.forEach((post) => {
    post?.postOffers?.forEach((offer) => {
      offer?.permanentEstablishments?.forEach((establishment) => {
        const key = createLocationKey(establishment);
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, establishment);
        }
      });
    });
  });

  return [...uniqueMap.values()];
};

export const getSearchOptions = async (
  posts: Awaited<ReturnType<typeof getPosts>>,
): Promise<SearchOptions | undefined> => {
  const t = await getTranslations();
  const noneOption = { value: 'all', label: t('Main.all') };

  if (!posts) {
    return;
  }

  const extractUniqueKeys = <T>(extractor: (post: Post) => (T | undefined)[]): Set<T> =>
    new Set(posts.flatMap((element) => extractor(element)).filter(Boolean) as T[]);

  const uniqueCareerLevelKeys = extractUniqueKeys(
    (post) => post.postOffers?.map((offer) => offer.careerLevelKey) ?? [],
  );

  const uniqueWorkingTimeModelKeys = extractUniqueKeys(
    (post) => post.postOffers?.map((offer) => offer.workingTimeModelKey) ?? [],
  );

  const uniqueEmploymentContractTypeKeys = extractUniqueKeys(
    (post) => post.postOffers?.map((offer) => offer.employmentContractKey) ?? [],
  );

  const uniqueScopeOfActivitiesKeys = extractUniqueKeys((post) => [post.scopeOfActivitiesKey]);

  const uniquePlaceOfWorkTypeKeys = extractUniqueKeys(
    (post) => post.postOffers?.map((offer) => offer.placeOfWorkTypeKey) ?? [],
  );

  const carreerLevel: SelectOptionProps[] = [
    noneOption,
    ...[...uniqueCareerLevelKeys].map((key) => ({
      label: t(`Job.carreerLevelKey.${key}`) || key,
      value: key,
    })),
  ];

  const workingTimeModel: SelectOptionProps[] = [
    noneOption,
    ...[...uniqueWorkingTimeModelKeys].map((key) => ({
      label: t(`Job.workingTimeModelKey.${key}`) || key,
      value: key,
    })),
  ];

  const employmentContractType: SelectOptionProps[] = [
    noneOption,
    ...[...uniqueEmploymentContractTypeKeys].map((key) => ({
      label: t(`Job.employmentContractTypeKey.${key}`) || key,
      value: key,
    })),
  ];

  const scopeOfActivities: SelectOptionProps[] = [
    noneOption,
    ...[...uniqueScopeOfActivitiesKeys].map((key) => ({
      label: t(`Job.scopeOfActivitiesKey.${key}`) || key,
      value: key,
    })),
  ];

  const uniquePermanentEstablishments = getUniqueEstablishments(posts);

  const locationOptions: SelectOptionProps[] = uniquePermanentEstablishments.map((establishment) => {
    if (!establishment.address) {
      return { value: '', label: '' };
    }

    const { street, city, internationalCountryCode } = establishment.address;
    const value = `${city}_${internationalCountryCode}`;
    const label = `${city}, ${street}, (${internationalCountryCode})`; // TODO: Translate Country

    return {
      value,
      label,
    };
  });

  const placeOfWorkType: SelectOptionProps[] = [
    noneOption,
    ...[...uniquePlaceOfWorkTypeKeys].map((key) => ({
      label: t(`Job.placeOfWorkTypeKey.${key}`) || key,
      value: key,
    })),
    ...locationOptions,
  ];

  return {
    carreerLevel,
    workingTimeModel,
    employmentContractType,
    scopeOfActivities,
    placeOfWorkType,
  };
};
