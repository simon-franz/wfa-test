import { createHRWorksApiClient } from '@hrworks/api-client';

const { API_BASE_URL, API_SIGNATURE } = process.env;

if (!API_BASE_URL || !API_SIGNATURE) {
  throw new Error('API_BASE_URL and API_SIGNATURE environment variables are required');
}

const apiClient = createHRWorksApiClient({
  baseUrl: `https://${API_BASE_URL!}`,
  secret: API_SIGNATURE ? JSON.parse(API_SIGNATURE!).signatures[0] : '',
});

export const { GET, POST, PUT, DELETE, PATCH } = apiClient;
