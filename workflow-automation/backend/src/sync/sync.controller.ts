import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantId } from '../common/decorators/index';

@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private syncService: SyncService) {}

  @Post('full')
  async triggerFullSync(@TenantId() tenantId: string) {
    return this.syncService.fullSync(tenantId);
  }

  @Get('status')
  async getSyncStatus(@TenantId() tenantId: string) {
    return this.syncService.getSyncStatus(tenantId);
  }

  @Get('persons')
  async getPersons(@TenantId() tenantId: string) {
    return this.syncService.getPersons(tenantId);
  }

  @Get('organization-units')
  async getOrganizationUnits(@TenantId() tenantId: string) {
    return this.syncService.getOrganizationUnits(tenantId);
  }
}
