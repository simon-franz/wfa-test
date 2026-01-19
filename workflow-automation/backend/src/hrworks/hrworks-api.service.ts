import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HrworksAuthService } from './hrworks-auth.service';
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
  private readonly baseUrl: string;
  private readonly defaultRetries = 3;
  private readonly defaultRetryDelay = 1000;

  constructor(
    private configService: ConfigService,
    private hrworksAuth: HrworksAuthService,
  ) {
    this.baseUrl = this.configService.get<string>('HRWORKS_API_BASE_URL') || 'https://api.hrworks.de';
  }

  private async request<T>(
    tenantId: string,
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    const { retries = this.defaultRetries, retryDelay = this.defaultRetryDelay } = options;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const accessToken = await this.hrworksAuth.getAccessToken(tenantId);

        const response = await fetch(`${this.baseUrl}${path}`, {
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
  async getPersons(tenantId: string, page = 1, pageSize = 100): Promise<PaginatedResponse<HRWorksPerson>> {
    return this.request<PaginatedResponse<HRWorksPerson>>(
      tenantId,
      'GET',
      `/v2/persons?page=${page}&pageSize=${pageSize}`,
    );
  }

  async getAllPersons(tenantId: string): Promise<HRWorksPerson[]> {
    const allPersons: HRWorksPerson[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getPersons(tenantId, page, 100);
      allPersons.push(...response.data);

      if (response.pagination) {
        hasMore = page < response.pagination.totalPages;
        page++;
      } else {
        hasMore = false;
      }
    }

    return allPersons;
  }

  async getPerson(tenantId: string, personnelNumber: string): Promise<HRWorksPerson> {
    return this.request<HRWorksPerson>(tenantId, 'GET', `/v2/persons/${personnelNumber}`);
  }

  // Organization Units API
  async getOrganizationUnits(
    tenantId: string,
    page = 1,
    pageSize = 100,
  ): Promise<PaginatedResponse<HRWorksOrganizationUnit>> {
    return this.request<PaginatedResponse<HRWorksOrganizationUnit>>(
      tenantId,
      'GET',
      `/v2/organization-units?page=${page}&pageSize=${pageSize}`,
    );
  }

  async getAllOrganizationUnits(tenantId: string): Promise<HRWorksOrganizationUnit[]> {
    const allUnits: HRWorksOrganizationUnit[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getOrganizationUnits(tenantId, page, 100);
      allUnits.push(...response.data);

      if (response.pagination) {
        hasMore = page < response.pagination.totalPages;
        page++;
      } else {
        hasMore = false;
      }
    }

    return allUnits;
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
