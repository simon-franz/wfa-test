import { config } from 'dotenv';

export const getExecutionEnvironment = (): string => {
  return process.env.EXECUTION_ENVIRONMENT || 'LOCAL';
};

export const isRunningLocally = (): boolean => {
  return getExecutionEnvironment() === 'LOCAL';
};

export const loadEnvironmentConfig = (): void => {
  if (isRunningLocally()) {
    config({ path: './.env.development.local', override: true });
  }
};

export const getReportPortalApiKey = (): string => {
  return process.env.REPORT_PORTAL_API_KEY || '';
};
