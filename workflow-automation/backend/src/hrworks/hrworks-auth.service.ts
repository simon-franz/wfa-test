import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LandlordService } from '../db/landlord.service';
import type { HRWorksAuthResponse } from 'shared/types';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

@Injectable()
export class HrworksAuthService {
  private readonly logger = new Logger(HrworksAuthService.name);
  private tokenCache: Map<string, TokenCache> = new Map();
  private readonly tokenRefreshBuffer = 5 * 60 * 1000; // 5 minutes before expiry

  constructor(
    private configService: ConfigService,
    private landlordService: LandlordService,
  ) {}

  async getAccessToken(tenantId: string): Promise<string> {
    // Check cache
    const cached = this.tokenCache.get(tenantId);
    if (cached && cached.expiresAt > Date.now() + this.tokenRefreshBuffer) {
      return cached.accessToken;
    }

    // Get tenant credentials
    const tenant = await this.landlordService.findTenantById(tenantId);
    if (!tenant) {
      throw new Error(`Tenant not found: ${tenantId}`);
    }

    const apiKey = tenant.settings.hrworksApiKey;
    const apiSecret = tenant.settings.hrworksApiSecret;
    // Support both hrworksApiBaseUrl (new) and hrworksTenant (legacy field name)
    const apiBaseUrl = tenant.settings.hrworksApiBaseUrl
      || tenant.settings.hrworksTenant
      || this.configService.get<string>('HRWORKS_API_BASE_URL')
      || 'https://api.hrworks.de';

    this.logger.log(`API Base URL from settings: ${apiBaseUrl}`);
    this.logger.log(`API Key (first 8 chars): ${apiKey?.substring(0, 8)}...`);

    if (!apiKey || !apiSecret) {
      throw new Error(`HR WORKS API credentials not configured for tenant: ${tenantId}`);
    }

    // Get new token
    const token = await this.fetchAccessToken(apiKey, apiSecret, apiBaseUrl);

    // Cache token (use expires_in from response, with buffer)
    const expiresInMs = (token.expires_in - 60) * 1000; // 1 minute buffer
    this.tokenCache.set(tenantId, {
      accessToken: token.access_token,
      expiresAt: Date.now() + expiresInMs,
    });

    return token.access_token;
  }

  private async fetchAccessToken(apiKey: string, apiSecret: string, apiBaseUrl: string): Promise<HRWorksAuthResponse> {
    // Remove trailing slash from base URL to avoid double slashes
    const cleanBaseUrl = apiBaseUrl.replace(/\/+$/, '');
    const authUrl = `${cleanBaseUrl}/v2/authentication`;

    const requestBody = {
      accessKey: apiKey,
      secretAccessKey: apiSecret,
    };

    this.logger.log(`Fetching token from: ${authUrl}`);
    this.logger.log(`Request body keys: ${Object.keys(requestBody).join(', ')}`);

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    this.logger.log(`Response status: ${response.status}`);

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Auth failed - Status: ${response.status}, Response: ${error}`);
      throw new Error(`HR WORKS authentication failed: ${error}`);
    }

    const tokenResponse = await response.json() as Record<string, unknown>;
    this.logger.log(`Token response keys: ${Object.keys(tokenResponse).join(', ')}`);
    this.logger.log(`Token response: ${JSON.stringify(tokenResponse).substring(0, 200)}`);

    // Handle different response formats (access_token or token)
    const accessToken = (tokenResponse.access_token || tokenResponse.token) as string | undefined;

    if (!accessToken) {
      throw new Error(`No access token in response: ${JSON.stringify(tokenResponse)}`);
    }

    const result: HRWorksAuthResponse = {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: (tokenResponse.expires_in as number) || 900, // Default 15 minutes
    };

    return result;
  }

  clearCache(tenantId: string) {
    this.tokenCache.delete(tenantId);
  }
}
