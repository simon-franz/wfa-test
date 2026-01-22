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

interface JobStatusResponse {
  status: string;
  responseType?: string;
  apiResponse?: {
    status?: string;
    result?: any[];
    generalErrors?: { code: string; message: string }[];
    dataErrors?: { recordId: number; code: string; message: string }[];
  };
}

interface PollingOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
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
            'Cache-Control': 'no-cache',
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
    // HR WORKS API handles POST /persons asynchronously - returns a jobId
    // The API expects { data: [PersonData] } format
    const jobResponse = await this.request<{ jobId: string }>(
      tenantId,
      'POST',
      '/v2/persons',
      { data: [personData] },
    );

    if (!jobResponse.jobId) {
      throw new Error('HR WORKS API did not return a jobId for createPerson');
    }

    this.logger.log(`createPerson: Job started with ID ${jobResponse.jobId}, polling for completion...`);

    // Poll until the job is complete
    const result = await this.pollJobUntilComplete(
      tenantId,
      '/v2/persons/jobs',
      jobResponse.jobId,
    );

    // Extract the created person from the result
    if (result.apiResponse?.result?.[0]) {
      return result.apiResponse.result[0] as HRWorksPerson;
    }

    throw new Error('HR WORKS API did not return the created person data');
  }

  /**
   * Poll a HR WORKS job endpoint until the job is complete
   * HR WORKS async operations return a jobId, and we need to poll /jobs/{jobId} until done
   */
  private async pollJobUntilComplete(
    tenantId: string,
    jobsBasePath: string,
    jobId: string,
    options: PollingOptions = {},
  ): Promise<JobStatusResponse> {
    const {
      maxAttempts = 60, // Max 60 attempts (about 5 minutes with exponential backoff)
      initialDelay = 500, // Start with 500ms
      maxDelay = 5000, // Cap at 5 seconds between polls
    } = options;

    let attempt = 0;
    let delay = initialDelay;

    while (attempt < maxAttempts) {
      attempt++;

      const response = await this.request<JobStatusResponse>(
        tenantId,
        'GET',
        `${jobsBasePath}/${jobId}`,
      );

      this.logger.log(`Job ${jobId} status: ${response.status} (attempt ${attempt}/${maxAttempts})`);

      // Check if job is complete
      if (response.status === 'completed' || response.status === 'done' || response.status === 'finished') {

        // Check for errors in the response - check multiple possible error locations
        const generalErrors = response.apiResponse?.generalErrors || (response as any).generalErrors;
        const dataErrors = response.apiResponse?.dataErrors || (response as any).dataErrors;

        // If there are any errors, log the full response for debugging
        if (generalErrors?.length || dataErrors?.length) {
          this.logger.error(`Job ${jobId} FULL RESPONSE: ${JSON.stringify(response, null, 2)}`);
        }

        // Collect all error messages from both generalErrors and dataErrors
        const allErrors: string[] = [];

        if (dataErrors?.length) {
          for (const dataError of dataErrors) {
            // Extract errors from the nested errors array (HR WORKS format: { errors: [{ number, text }], recordId })
            if (dataError.errors && Array.isArray(dataError.errors)) {
              for (const err of dataError.errors) {
                const errorText = err.text || err.message || err.errorMessage || JSON.stringify(err);
                allErrors.push(`[Record ${dataError.recordId || 'N/A'}] ${errorText}`);
              }
            } else if (dataError.message || dataError.errorMessage || dataError.text) {
              allErrors.push(`[Record ${dataError.recordId || 'N/A'}] ${dataError.message || dataError.errorMessage || dataError.text}`);
            }
          }
        }

        if (generalErrors?.length && allErrors.length === 0) {
          // Only use generalErrors if no specific dataErrors were found
          for (const err of generalErrors) {
            allErrors.push(err.message || err.errorMessage || JSON.stringify(err));
          }
        }

        if (allErrors.length > 0) {
          const errorMessage = allErrors.join('; ');
          throw new Error(`HR WORKS job failed: ${errorMessage}`);
        }

        this.logger.log(`Job ${jobId} completed successfully after ${attempt} attempts`);
        return response;
      }

      // Job failed
      if (response.status === 'failed' || response.status === 'error') {
        const errorMessages =
          response.apiResponse?.generalErrors?.map((e) => e.message).join(', ') ||
          response.apiResponse?.dataErrors?.map((e) => e.message).join(', ') ||
          'Unknown error';
        throw new Error(`HR WORKS job ${jobId} failed: ${errorMessages}`);
      }

      // Job still pending - wait and retry with exponential backoff
      await this.delay(delay);
      delay = Math.min(delay * 1.5, maxDelay);
    }

    throw new Error(`HR WORKS job ${jobId} did not complete within ${maxAttempts} attempts`);
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
