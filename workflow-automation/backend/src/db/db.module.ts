import { Module, Global } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { TenantManager } from './tenant-manager';

@Global()
@Module({
  providers: [LandlordService, TenantManager],
  exports: [LandlordService, TenantManager],
})
export class DbModule {}
