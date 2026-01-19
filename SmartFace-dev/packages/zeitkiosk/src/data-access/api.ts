import { LegacyApiClient } from '@hrworks/api-client';

export const apiClient = new LegacyApiClient({
  baseUrl: process.env.API_BASE_URL,
  serverSecret: process.env.API_SIGNATURE,
});
