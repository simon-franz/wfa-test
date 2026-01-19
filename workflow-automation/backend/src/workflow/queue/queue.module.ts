import { Module, Global, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue, Worker } from 'bullmq';

export const WORKFLOW_QUEUE = 'workflow-execution';

@Global()
@Module({
  providers: [
    {
      provide: 'WORKFLOW_QUEUE',
      useFactory: (configService: ConfigService) => {
        return new Queue(WORKFLOW_QUEUE, {
          connection: {
            host: configService.get<string>('REDIS_HOST') || 'localhost',
            port: configService.get<number>('REDIS_PORT') || 6379,
          },
          defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000,
            },
            removeOnComplete: 100,
            removeOnFail: 1000,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['WORKFLOW_QUEUE'],
})
export class QueueModule implements OnModuleDestroy {
  constructor() {}

  async onModuleDestroy() {
    // Cleanup handled by individual services
  }
}
