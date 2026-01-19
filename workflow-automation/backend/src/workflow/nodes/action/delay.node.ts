import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';

interface DelayConfig {
  duration: number;
  unit: 'seconds' | 'minutes' | 'hours' | 'days';
}

@Injectable()
export class DelayNode extends BaseNode {
  readonly type = 'delay';
  readonly category = 'action' as const;

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    const config = input.config.config as unknown as DelayConfig;

    const durationMs = this.calculateDurationMs(config.duration, config.unit);
    const startTime = Date.now();

    // Actually wait for the duration
    await new Promise((resolve) => setTimeout(resolve, durationMs));

    const endTime = Date.now();

    return {
      output: {
        duration: config.duration,
        unit: config.unit,
        durationMs,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        actualDurationMs: endTime - startTime,
      },
    };
  }

  private calculateDurationMs(duration: number, unit: DelayConfig['unit']): number {
    switch (unit) {
      case 'seconds':
        return duration * 1000;
      case 'minutes':
        return duration * 60 * 1000;
      case 'hours':
        return duration * 60 * 60 * 1000;
      case 'days':
        return duration * 24 * 60 * 60 * 1000;
      default:
        return duration * 1000;
    }
  }

  getDefaultConfig(): Record<string, unknown> {
    return {
      duration: 5,
      unit: 'seconds',
    };
  }

  getConfigSchema() {
    return {
      type: 'object',
      required: ['duration', 'unit'],
      properties: {
        duration: {
          type: 'number',
          title: 'Duration',
          description: 'How long to wait',
          minimum: 1,
        },
        unit: {
          type: 'string',
          title: 'Unit',
          enum: ['seconds', 'minutes', 'hours', 'days'],
          default: 'seconds',
        },
      },
    };
  }
}
