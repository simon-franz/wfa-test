// TODO: Remove once Zeitkiosk uses the new client

import { createSignatureString, signStringWithServerSecret } from './signStringWithServerSecret';

type HttpMethod = 'GET' | 'POST';

type RequestOptions = {
  method?: HttpMethod;
  queryParams?: Record<string, string | number | boolean>;
  body?: unknown;
  headers?: Record<string, string>;
};

type ApiClientOptions = {
  baseUrl?: string;
  serverSecret?: string;
};

const DEFAULT_API_URL = 'http://localhost:3333';

export class LegacyApiClient {
  private baseUrl: string;
  private serverSecret: string;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || DEFAULT_API_URL;
    this.serverSecret = options.serverSecret || '';
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', queryParams = {}, body, headers = {} } = options;

    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Add query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    // Generate signature for authentication
    const signatureString = createSignatureString();
    const signedString = signStringWithServerSecret(signatureString, this.serverSecret);

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-hrworks-signature': signedString,
        'x-hrworks-timestamp': JSON.parse(signatureString).timestamp,
        ...headers,
      },
    };

    // Add body if it exists and method isn't GET
    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      const responseBody = await response.text();
      console.log('Response body:', responseBody);

      // Try to parse as JSON for structured error information
      let errorData;
      try {
        errorData = JSON.parse(responseBody);
      } catch {
        errorData = { message: responseBody };
      }

      const error = new Error(`API request failed: ${response.status} ${response.statusText} - ${responseBody}`);
      (error as any).response = {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
        headers: response.headers,
      };

      throw error;
    }

    return response.json();
  }

  // Convenience methods for common HTTP verbs
  async get<T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body: unknown, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }
}
