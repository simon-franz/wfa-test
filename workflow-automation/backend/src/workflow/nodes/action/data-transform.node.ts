import { Injectable } from '@nestjs/common';
import { BaseNode, NodeExecutionInput } from '../base-node';
import { WorkflowService } from '../../workflow.service';

@Injectable()
export class DataTransformNode extends BaseNode {
  type = 'data-transform';
  category: 'action' | 'trigger' | 'logic' = 'action';

  constructor(private workflowService: WorkflowService) {
    super();
  }

  async execute(input: NodeExecutionInput): Promise<any> {
    const { config, context } = input;
    
    const result = this.workflowService['executeDataTransform'](
      config.config,
      context.nodeResults
    );

    return { output: result.output };
  }

  getConfigSchema(): Record<string, unknown> {
    return {
      operation: { type: 'string', required: true },
      inputPath: { type: 'string', required: false },
    };
  }
}
