import { Module } from '@nestjs/common';
import { HrworksAuthService } from './hrworks-auth.service';
import { HrworksApiService } from './hrworks-api.service';

@Module({
  providers: [HrworksAuthService, HrworksApiService],
  exports: [HrworksAuthService, HrworksApiService],
})
export class HrworksModule {}
