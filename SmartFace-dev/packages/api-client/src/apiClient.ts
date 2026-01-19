import type { paths } from '@hrworks/api-schema';
import createClient, { type Client } from 'openapi-fetch';

import { createSignatureString, signStringWithServerSecret } from './signStringWithServerSecret';

export type ApiClientConfig = {
  baseUrl: string;
  secret: string;
};

export class HRWorksApiClient {
  private client: Client<paths>;
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
    this.client = this.createClient();
  }

  private createClient(): Client<paths> {
    const client = createClient<paths>({
      baseUrl: this.config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { secret } = this.config;

    client.use({
      onRequest({ request }) {
        const signatureString = createSignatureString();
        const signedString = signStringWithServerSecret(signatureString, secret);
        const timestamp = JSON.parse(signatureString).timestamp;

        request.headers.set('x-hrworks-signature', signedString);
        request.headers.set('x-hrworks-timestamp', timestamp);

        return request;
      },
    });

    return client;
  }

  public get GET() {
    return this.client.GET.bind(this.client);
  }

  public get POST() {
    return this.client.POST.bind(this.client);
  }

  public get PUT() {
    return this.client.PUT.bind(this.client);
  }

  public get DELETE() {
    return this.client.DELETE.bind(this.client);
  }

  public get PATCH() {
    return this.client.PATCH.bind(this.client);
  }
}

export const createHRWorksApiClient = (config: ApiClientConfig): HRWorksApiClient => new HRWorksApiClient(config);
