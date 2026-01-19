import type { PostWithPostOffer } from '../types/post';
import { getPosts } from './getPosts';

export const getSinglePostWithPostOffer = async (
  postOfferId: string,
  customerCompanyNumber: string,
): Promise<PostWithPostOffer | undefined> => {
  const posts = await getPosts(customerCompanyNumber);

  if (!posts) {
    return;
  }

  for (const post of posts) {
    const postOffer = post.postOffers?.find((offer) => offer.id === postOfferId);
    if (postOffer) {
      const postWithPostOffer = { ...post, postOffer };

      return postWithPostOffer;
    }
  }

  return undefined;
};
