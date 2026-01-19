import { apiClient } from './api';

type Settings = {
  onlyShowUserId: boolean;
  isCameraContinuous: boolean;
  isTimeTypeSelectionEnabled: boolean;
  isProjectBookingEnabled: boolean;
};

type SettingsResponse = {
  settings: Settings;
};

export const getSettings = async (): Promise<Settings> => {
  const response = await apiClient.get<SettingsResponse>('/time-management/settings');

  return response.settings;
};
