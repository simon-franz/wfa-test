import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';
import { ExpressionService } from '../../expression/expression.service';

interface ConditionConfig {
  expression: string;
}

@Injectable()
export class ConditionNode extends BaseNode {
  readonly type = 'condition';
  readonly category = 'logic' as const;

  constructor(private expressionService: ExpressionService) {
    super();
  }

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    const config = input.config.config as unknown as ConditionConfig;

    // Evaluate the condition expression
    const result = await this.expressionService.evaluateBoolean(config.expression, input.context);

    return {
      output: {
        condition: config.expression,
        result,
      },
      // Signal which branch to take
      // The workflow engine will use this to determine next nodes
      nextNodes: result ? ['true'] : ['false'],
    };
  }

  getDefaultConfig(): Record<string, unknown> {
    return {
      expression: 'true',
    };
  }

  getConfigSchema() {
    return {
      type: 'object',
      required: ['expression'],
      properties: {
        expression: {
          type: 'string',
          title: 'Condition Expression',
          description:
            'JSONata expression that evaluates to true or false. Example: $nodes.getData.output.role = "Developer"',
          examples: [
            '$nodes.getData.output.status = "active"',
            '$vars.count > 10',
            '$nodes.httpRequest.output.status = 200',
          ],
        },
      },
    };
  }
}
