'use server';

import { apiClient } from './api';

type StartStopWorkingTimeResponse = {
  result: {
    beginDateAndTime: string;
    endDateAndTime: string;
    clockInKioskId: number;
    clockOutKioskId: number;
    comment: string;
    workingTimeType: {
      name: string;
      type: string;
    };
    project: {
      name: string;
      id: string;
      number: number;
    };
    id: string;
  };
  warnings: {
    warningNumber: number;
    warningMessage: string;
  }[];
};

export const startStopWorkingTime = async (action: string): Promise<StartStopWorkingTimeResponse> => {
  const data = { data: [{ action }] };
  const response = await apiClient.post<StartStopWorkingTimeResponse>('/persons/working-times', data);

  return response;
};
