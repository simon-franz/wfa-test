import { Module } from '@nestjs/common';
import { HrworksWebhookController } from './hrworks-webhook.controller';
import { HrworksWebhookService } from './hrworks-webhook.service';
import { SyncModule } from '../sync/sync.module';

@Module({
  imports: [SyncModule],
  controllers: [HrworksWebhookController],
  providers: [HrworksWebhookService],
})
export class WebhooksModule {}
