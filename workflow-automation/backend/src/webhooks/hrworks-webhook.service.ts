import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { LandlordService } from '../db/landlord.service';
import { SyncService } from '../sync/sync.service';
import type { HRWorksWebhookPayload, HRWorksPerson, HRWorksOrganizationUnit } from 'shared/types';

@Injectable()
export class HrworksWebhookService {
  private readonly logger = new Logger(HrworksWebhookService.name);

  constructor(
    private landlordService: LandlordService,
    private syncService: SyncService,
  ) {}

  async verifySignature(
    tenantId: string,
    payload: string,
    signature: string,
  ): Promise<boolean> {
    const tenant = await this.landlordService.findTenantById(tenantId);
    if (!tenant || !tenant.settings.webhookSecret) {
      this.logger.warn(`Webhook secret not configured for tenant: ${tenantId}`);
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', tenant.settings.webhookSecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  }

  async processWebhook(tenantId: string, payload: HRWorksWebhookPayload) {
    this.logger.log(`Processing webhook event: ${payload.event} for tenant: ${tenantId}`);

    try {
      switch (payload.event) {
        case 'person.created':
        case 'person.updated':
          await this.syncService.upsertPerson(tenantId, payload.data as HRWorksPerson);
          break;

        case 'person.deleted':
          const deletedPerson = payload.data as HRWorksPerson;
          await this.syncService.deletePerson(tenantId, deletedPerson.personnelNumber);
          break;

        case 'organization_unit.created':
        case 'organization_unit.updated':
          await this.syncService.upsertOrganizationUnit(
            tenantId,
            payload.data as HRWorksOrganizationUnit,
          );
          break;

        case 'organization_unit.deleted':
          const deletedOu = payload.data as HRWorksOrganizationUnit;
          await this.syncService.deleteOrganizationUnit(tenantId, deletedOu.id);
          break;

        default:
          this.logger.warn(`Unknown webhook event: ${payload.event}`);
      }

      this.logger.log(`Webhook processed successfully: ${payload.event}`);
    } catch (error) {
      this.logger.error(`Failed to process webhook: ${payload.event}`, error);
      throw error;
    }
  }
}
