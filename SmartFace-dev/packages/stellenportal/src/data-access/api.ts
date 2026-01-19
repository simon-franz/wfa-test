import { createHRWorksApiClient } from '@hrworks/api-client';

const apiClient = createHRWorksApiClient({
  baseUrl: `https://${process.env.API_BASE_URL!}`,
  secret: process.env.API_SIGNATURE ? JSON.parse(process.env.API_SIGNATURE!).signatures[0] : '',
});

export const { GET, POST, PUT, DELETE, PATCH } = apiClient;
