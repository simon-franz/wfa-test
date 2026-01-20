import { Injectable } from '@nestjs/common';
import { LandlordService } from '../db/landlord.service';

@Injectable()
export class SettingsService {
  constructor(private landlordService: LandlordService) {}

  async saveHRWorksSettings(
    tenantId: string,
    apiKey: string,
    apiSecret: string,
    tenant: string,
  ) {
    await this.landlordService.updateTenantSettings(tenantId, {
      hrworksApiKey: apiKey,
      hrworksApiSecret: apiSecret,
      hrworksTenant: tenant,
    });
  }

  async getHRWorksSettings(tenantId: string) {
    const tenant = await this.landlordService.findTenantById(tenantId);
    if (!tenant) {
      return null;
    }
    return {
      apiKey: tenant.settings.hrworksApiKey || '',
      apiSecret: tenant.settings.hrworksApiSecret || '',
      tenant: tenant.settings.hrworksTenant || '',
    };
  }
}
