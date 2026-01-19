import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';

@Injectable()
export class ScheduledTriggerNode extends BaseNode {
  readonly type = 'scheduled-trigger';
  readonly category = 'trigger' as const;

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    const config = input.config.config as { cronExpression?: string; timezone?: string };

    return {
      output: {
        triggeredAt: new Date().toISOString(),
        triggerType: 'scheduled',
        cronExpression: config.cronExpression,
        timezone: config.timezone || 'UTC',
        scheduledTime: input.context.trigger?.payload?.scheduledTime,
      },
    };
  }

  getDefaultConfig() {
    return {
      cronExpression: '0 9 * * 1-5', // Every weekday at 9 AM
      timezone: 'UTC',
    };
  }

  getConfigSchema() {
    return {
      type: 'object',
      required: ['cronExpression'],
      properties: {
        cronExpression: {
          type: 'string',
          title: 'Cron Expression',
          description: 'Schedule in cron format (e.g., "0 9 * * 1-5" for weekdays at 9 AM)',
          examples: ['0 9 * * 1-5', '0 0 * * *', '*/15 * * * *'],
        },
        timezone: {
          type: 'string',
          title: 'Timezone',
          description: 'Timezone for the schedule',
          default: 'UTC',
          examples: ['UTC', 'Europe/Berlin', 'America/New_York'],
        },
      },
    };
  }
}
