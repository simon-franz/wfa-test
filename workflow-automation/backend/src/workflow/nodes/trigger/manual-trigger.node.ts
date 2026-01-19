import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';

@Injectable()
export class ManualTriggerNode extends BaseNode {
  readonly type = 'manual-trigger';
  readonly category = 'trigger' as const;

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    // Manual trigger doesn't do any work, it just passes through
    // the trigger payload
    return {
      output: {
        triggeredAt: new Date().toISOString(),
        triggerType: 'manual',
        payload: input.context.trigger?.payload || {},
      },
    };
  }

  getDefaultConfig() {
    return {
      description: '',
    };
  }

  getConfigSchema() {
    return {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          title: 'Description',
          description: 'Optional description for this trigger',
        },
      },
    };
  }
}
