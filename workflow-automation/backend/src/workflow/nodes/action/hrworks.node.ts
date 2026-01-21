import { Injectable } from '@nestjs/common';
import { BaseNode, NodeExecutionInput } from '../base-node';
import { WorkflowService } from '../../workflow.service';

@Injectable()
export class HrworksNode extends BaseNode {
  type = 'hrworks';
  category: 'action' | 'trigger' | 'logic' = 'action';

  constructor(private workflowService: WorkflowService) {
    super();
  }

  async execute(input: NodeExecutionInput): Promise<any> {
    const { config, context } = input;
    const tenantId = context.tenantId;
    
    const result = await this.workflowService['executeHrworksNode'](
      tenantId,
      config.config,
      context.nodeResults
    );

    return { output: result.output };
  }

  getConfigSchema(): Record<string, unknown> {
    return {
      endpoint: { type: 'string', required: true },
      params: { type: 'object', required: false },
    };
  }
}
