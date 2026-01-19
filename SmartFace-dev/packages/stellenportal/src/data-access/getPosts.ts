import { cache } from 'react';

import { GET } from './api';

export const getPosts = cache(async (customerCompanyNumber: string) => {
  console.log(`🌐 Fetching posts for: ${customerCompanyNumber}`);
  const { data, error } = await GET('/v2/hrworks/applicant-management/posts', {
    params: {
      query: { customerCompanyNumber },
    },
    next: { revalidate: 300 },
  });

  if (error) {
    throw new Error(`Failed to fetch settings: ${error.errorCode}  ${error.errorMessage || 'Unknown error'}`);
  }

  return data.posts;
});
