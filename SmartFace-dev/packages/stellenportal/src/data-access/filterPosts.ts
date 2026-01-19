import type { components } from '@hrworks/api-schema';

import type { Post } from '../types/post';

type ParamValue = string | string[] | undefined;

type Params = { [key: string]: ParamValue };

const getStringParam = (value: ParamValue): string => (typeof value === 'string' ? value.trim() : '');

export const filterPosts = async (posts?: Post[], params?: Params): Promise<Post[] | undefined> => {
  // await new Promise((resolve) => setTimeout(resolve, 5000)); TODO: Remove once testing is done

  const searchQuery = getStringParam(params?.searchQuery).toLocaleLowerCase();
  const careerLevelKey = getStringParam(params?.level);
  const workingTimeModelKey = getStringParam(params?.time);
  const employmentContractKey = getStringParam(params?.type);
  const scopeOfActivitiesKey = getStringParam(params?.discipline);
  const location = getStringParam(params?.location);

  let filteredPosts = posts;

  if (!filteredPosts) {
    return;
  }

  if (searchQuery) {
    filteredPosts = filteredPosts.filter((post) => {
      const matchesTitle = post.postOffers?.some((offer) => offer.displayName?.toLowerCase().includes(searchQuery));
      const matchesDescriptionTitle = post.postDescriptions?.tasks?.title?.toLowerCase().includes(searchQuery);
      const matchesDescriptionContent = post.postDescriptions?.tasks?.description?.toLowerCase().includes(searchQuery);

      return matchesTitle || matchesDescriptionTitle || matchesDescriptionContent;
    });
  }

  if (careerLevelKey) {
    filteredPosts = filteredPosts.filter((post) => {
      return post.postOffers?.some((offer) => offer.careerLevelKey === careerLevelKey);
    });
  }

  if (workingTimeModelKey) {
    filteredPosts = filteredPosts.filter((post) => {
      return post.postOffers?.some((offer) => offer.workingTimeModelKey === workingTimeModelKey);
    });
  }

  if (employmentContractKey) {
    filteredPosts = filteredPosts.filter((post) => {
      return post.postOffers?.some((offer) => offer.employmentContractKey === employmentContractKey);
    });
  }

  if (scopeOfActivitiesKey) {
    filteredPosts = filteredPosts.filter((post) => {
      return post.scopeOfActivitiesKey === scopeOfActivitiesKey;
    });
  }

  const checkEstablishment = (establishments: components['schemas']['PermanentEstablishment'][], location: string) =>
    establishments.some(
      (establishment) =>
        `${establishment.address?.city}_${establishment.address?.internationalCountryCode}` === location,
    );

  if (location) {
    filteredPosts = filteredPosts.filter((post) => {
      return post.postOffers?.some(
        (offer) =>
          offer.placeOfWorkTypeKey === location ||
          (offer.permanentEstablishments && checkEstablishment(offer.permanentEstablishments, location)),
      );
    });
  }

  return filteredPosts;
};
