import { ERROR_CODES } from '@hrworks/error-handling';
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { loggingFunction as log } from './ErrorHandling/functions/loggingFunction';
import { getSmartFaceBackendConfigProperty } from './getSmartFaceBackendConfigProperty';
import { getSmartFaceBackendRequestHeaders } from './getSmartFaceBackendRequestHeaders';

const defaultHeaders = {};

const axiosInstance = axios.create();

interface SfAxiosSuccess<Data> {
  type: 'success';
  data: Data;
}

interface SfAxiosError {
  type: 'error';
  error: Error | AxiosError | unknown;
}

export type SfAxiosResponse<Data> = SfAxiosSuccess<Data> | SfAxiosError;

type SfAxiosGetOptions = {
  params?: any;
  headers?: Record<string, string>;
  config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'params' | 'headers'>;
};

type SfAxiosPostOptions = {
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data' | 'params' | 'headers'>;
};

const removeLeadingSlash = (urlPart: string): string => (/^\//.test(urlPart) ? urlPart.slice(1) : urlPart);

async function axiosCall<Data>(
  method: 'GET' | 'POST',
  url: string,
  requestData: any,
  headers: any,
): Promise<SfAxiosSuccess<Data> | SfAxiosError> {
  let response: AxiosResponse;

  const origin = `${window.location.protocol}//${window.location.host}`;
  const sfBaseUrl = getSmartFaceBackendConfigProperty('sfBaseUrl');

  try {
    response = await axiosInstance.request<Data>({
      timeout: getSmartFaceBackendConfigProperty('sfTimeoutLength') ?? 60_000,
      baseURL:
        (sfBaseUrl && `${origin}/${removeLeadingSlash(sfBaseUrl)}`) || import.meta.env.VITE_API_BASE_URL || origin,
      url,
      method,
      headers: {
        ...defaultHeaders,
        ...getSmartFaceBackendRequestHeaders(),
        ...headers,
      },
      ...requestData,
    });
  } catch (error) {
    if (
      (error as AxiosError).code === AxiosError.ERR_NETWORK &&
      (error as AxiosError).request &&
      !(error as AxiosError).response
    ) {
      return { type: 'error', error };
    }
    try {
      log({
        type: 'error',
        code: ERROR_CODES.NETWORK_ERROR,
        error: error instanceof Error ? error : new Error(JSON.stringify(error)),
      });
    } catch {
      log({
        type: 'error',
        code: ERROR_CODES.NETWORK_ERROR,
        error: new Error(`Error accessing ${url} on ${window?.location?.href}. Method: ${method}`),
      });
    }

    return { type: 'error', error };
  }

  return { type: 'success', data: response.data };
}

export const sfAxios = {
  async get<Data>(url: string, options: SfAxiosGetOptions = {}) {
    const { params = {}, headers = {}, config = {} } = options;

    return await axiosCall<Data>('GET', url, { params, ...config }, headers);
  },
  async post<Data>(url: string, options: SfAxiosPostOptions = {}) {
    const { data = {}, params = {}, headers = {}, config = {} } = options;

    return await axiosCall<Data>('POST', url, { data, params, ...config }, headers);
  },
};
