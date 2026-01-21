import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HrworksAuthService } from './hrworks-auth.service';
import { LandlordService } from '../db/landlord.service';
import type { HRWorksPerson, HRWorksOrganizationUnit } from 'shared/types';

interface RequestOptions {
  retries?: number;
  retryDelay?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

@Injectable()
export class HrworksApiService {
  private readonly logger = new Logger(HrworksApiService.name);
  private readonly defaultRetries = 3;
  private readonly defaultRetryDelay = 1000;

  constructor(
    private configService: ConfigService,
    private hrworksAuth: HrworksAuthService,
    private landlordService: LandlordService,
  ) {}

  private async request<T>(
    tenantId: string,
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    const { retries = this.defaultRetries, retryDelay = this.defaultRetryDelay } = options;

    // Get base URL from tenant settings (support both new and legacy field names)
    const tenant = await this.landlordService.findTenantById(tenantId);
    const baseUrl = tenant?.settings.hrworksApiBaseUrl
      || tenant?.settings.hrworksTenant
      || this.configService.get<string>('HRWORKS_API_BASE_URL')
      || 'https://api.hrworks.de';

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const accessToken = await this.hrworksAuth.getAccessToken(tenantId);

        const response = await fetch(`${baseUrl}${path}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (response.status === 401) {
          // Token expired, clear cache and retry
          this.hrworksAuth.clearCache(tenantId);
          if (attempt < retries) {
            continue;
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HR WORKS API error (${response.status}): ${errorText}`);
        }

        return response.json() as Promise<T>;
      } catch (error) {
        lastError = error as Error;
        this.logger.warn(`Request failed (attempt ${attempt + 1}/${retries + 1}): ${lastError.message}`);

        if (attempt < retries) {
          await this.delay(retryDelay * Math.pow(2, attempt)); // Exponential backoff
        }
      }
    }

    throw lastError || new Error('Request failed after all retries');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Persons API
  async getPersons(tenantId: string, page = 1, pageSize = 100): Promise<HRWorksPerson[]> {
    const response = await this.request<any>(
      tenantId,
      'GET',
      `/v2/persons?page=${page}&pageSize=${pageSize}`,
    );

    if (Array.isArray(response)) {
      return response;
    }
    
    // HR Works API returns dictionary: { "property1": [...], "property2": [...] }
    // Flatten all arrays from all keys
    const allPersons: HRWorksPerson[] = [];
    for (const value of Object.values(response)) {
      if (Array.isArray(value)) {
        allPersons.push(...value);
      }
    }
    return allPersons;
  }

  async getAllPersons(tenantId: string): Promise<HRWorksPerson[]> {
    // For now, just get the first page - HR Works API might not use pagination
    return this.getPersons(tenantId, 1, 1000);
  }

  async getPerson(tenantId: string, personnelNumber: string): Promise<HRWorksPerson> {
    return this.request<HRWorksPerson>(tenantId, 'GET', `/v2/persons/${personnelNumber}`);
  }

  async createPerson(tenantId: string, personData: Partial<HRWorksPerson>): Promise<HRWorksPerson> {
    return this.request<HRWorksPerson>(tenantId, 'POST', '/v2/persons', personData);
  }

  // Organization Units API
  async getOrganizationUnits(
    tenantId: string,
    page = 1,
    pageSize = 100,
  ): Promise<HRWorksOrganizationUnit[]> {
    const response = await this.request<any>(
      tenantId,
      'GET',
      `/v2/organization-units?page=${page}&pageSize=${pageSize}`,
    );

    if (Array.isArray(response)) {
      return response;
    }
    
    // HR Works API returns dictionary: { "property1": [...], "property2": [...] }
    // Flatten all arrays from all keys
    const allUnits: HRWorksOrganizationUnit[] = [];
    for (const value of Object.values(response)) {
      if (Array.isArray(value)) {
        allUnits.push(...value);
      }
    }
    return allUnits;
  }

  async getAllOrganizationUnits(tenantId: string): Promise<HRWorksOrganizationUnit[]> {
    return this.getOrganizationUnits(tenantId, 1, 1000);
  }

  async getOrganizationUnit(tenantId: string, orgUnitId: string): Promise<HRWorksOrganizationUnit> {
    return this.request<HRWorksOrganizationUnit>(tenantId, 'GET', `/v2/organization-units/${orgUnitId}`);
  }

  // Webhooks API
  async registerWebhook(tenantId: string, webhookUrl: string, events: string[]): Promise<{ id: string }> {
    return this.request<{ id: string }>(tenantId, 'POST', '/v2/webhooks', {
      url: webhookUrl,
      events,
    });
  }

  async deleteWebhook(tenantId: string, webhookId: string): Promise<void> {
    await this.request<void>(tenantId, 'DELETE', `/v2/webhooks/${webhookId}`);
  }

  async listWebhooks(tenantId: string): Promise<{ id: string; url: string; events: string[] }[]> {
    return this.request<{ id: string; url: string; events: string[] }[]>(tenantId, 'GET', '/v2/webhooks');
  }
}
