import { cache } from 'react';

import { GET } from './api';

export const getSettings = cache(async (customerCompanyNumber: string) => {
  const { data, error } = await GET('/v2/hrworks/applicant-management/jobportal-settings', {
    params: {
      query: { customerCompanyNumber },
    },
    next: { revalidate: 300 },
  });

  if (error) {
    throw new Error(`Failed to fetch settings: ${error.errorCode}  ${error.errorMessage || 'Unknown error'}`);
  }

  return data;
});
