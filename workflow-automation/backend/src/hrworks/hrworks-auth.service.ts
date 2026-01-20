import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LandlordService } from '../db/landlord.service';
import type { HRWorksAuthResponse } from 'shared/types';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

@Injectable()
export class HrworksAuthService {
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

    if (!apiKey || !apiSecret) {
      throw new Error(`HR WORKS API credentials not configured for tenant: ${tenantId}`);
    }

    // Get new token
    const token = await this.fetchAccessToken(apiKey, apiSecret);

    // Cache token (tokens are valid for 15 minutes)
    this.tokenCache.set(tenantId, {
      accessToken: token.token,
      expiresAt: Date.now() + 14 * 60 * 1000, // 14 minutes to be safe
    });

    return token.token;
  }

  private async fetchAccessToken(apiKey: string, apiSecret: string): Promise<HRWorksAuthResponse> {
    const apiBaseUrl = this.configService.get<string>('HRWORKS_API_BASE_URL') || 'https://api.hrworks.de';

    const response = await fetch(`${apiBaseUrl}/v2/authentication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessKey: apiKey,
        secretAccessKey: apiSecret,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HR WORKS authentication failed: ${error}`);
    }

    return response.json() as Promise<HRWorksAuthResponse>;
  }

  clearCache(tenantId: string) {
    this.tokenCache.delete(tenantId);
  }
}
