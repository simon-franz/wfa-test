import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { HrworksModule } from './hrworks/hrworks.module';
import { SyncModule } from './sync/sync.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Scheduling
    ScheduleModule.forRoot(),

    // Database
    DbModule,

    // Feature modules
    AuthModule,
    HrworksModule,
    SyncModule,
    WebhooksModule,
    WorkflowModule,
  ],
})
export class AppModule {}
