import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';
import { ExpressionService } from '../../expression/expression.service';

interface ConditionItem {
  id: string;
  label: string;
  expression: string;
}

interface ConditionConfig {
  conditions: ConditionItem[];
  enableDefault: boolean;
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

    // First-Match: Evaluate conditions in order
    for (const condition of config.conditions) {
      const result = await this.expressionService.evaluateBoolean(
        condition.expression,
        input.context,
      );

      if (result) {
        // First matching condition wins
        return {
          output: {
            matchedCondition: condition.id,
            matchedLabel: condition.label,
            matchedExpression: condition.expression,
          },
          nextNodes: [condition.id], // Use condition ID as handle
        };
      }
    }

    // No condition matched → use default if enabled
    if (config.enableDefault) {
      return {
        output: {
          matchedCondition: 'default',
          matchedLabel: 'Default',
        },
        nextNodes: ['default'],
      };
    }

    // No match and no default → workflow stops here
    return {
      output: {
        matchedCondition: null,
        message: 'No condition matched and no default path configured',
      },
      nextNodes: [],
    };
  }

  getDefaultConfig(): Record<string, unknown> {
    return {
      conditions: [
        {
          id: 'condition-1',
          label: 'Condition 1',
          expression: 'true',
        },
      ],
      enableDefault: true,
    };
  }

  getConfigSchema() {
    return {
      type: 'object',
      required: ['conditions'],
      properties: {
        conditions: {
          type: 'array',
          title: 'Conditions',
          description: 'List of conditions to evaluate (first match wins)',
          items: {
            type: 'object',
            required: ['id', 'label', 'expression'],
            properties: {
              id: {
                type: 'string',
                title: 'ID',
                description: 'Unique identifier for this condition',
              },
              label: {
                type: 'string',
                title: 'Label',
                description: 'Display name for this condition',
              },
              expression: {
                type: 'string',
                title: 'Expression',
                description: 'JSONata expression that evaluates to true or false',
                examples: [
                  'amount > 1000',
                  'status = "approved"',
                  'role = "manager"',
                ],
              },
            },
          },
          minItems: 1,
        },
        enableDefault: {
          type: 'boolean',
          title: 'Enable Default Path',
          description: 'Execute default path if no condition matches',
          default: true,
        },
      },
    };
  }
}
