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

  private resolveTemplates(expression: string, context: any): string {
    if (!expression || typeof expression !== 'string') return expression;

    // Replace {{NodeName.field}} with actual values
    const resolved = expression.replace(/\{\{(.+?)\}\}/g, (match, path) => {
      const trimmedPath = path.trim();
      
      // Remove .output. if present
      const cleanPath = trimmedPath.replace(/\.output\./g, '.').replace(/\.output$/g, '');
      
      // Get value from context
      const value = this.getValueByPath(context, cleanPath);
      
      return value !== undefined ? String(value) : match;
    });

    return resolved;
  }

  private getValueByPath(context: any, path: string): any {
    if (!path) return undefined;

    const parts = path.split('.');
    let current = context;

    // Try to navigate through nodeResults
    if (context.nodeResults) {
      const nodeName = parts[0];
      
      // First try: direct node ID lookup
      if (context.nodeResults[nodeName]) {
        current = context.nodeResults[nodeName].output;
        // Navigate remaining path
        for (let i = 1; i < parts.length; i++) {
          if (current === undefined || current === null) return undefined;
          current = current[parts[i]];
        }
        return current;
      }

      // Second try: search by node label (from workflow definition)
      // We need to find the node ID that matches the label
      const nodeId = this.findNodeIdByLabel(context, nodeName);
      if (nodeId && context.nodeResults[nodeId]) {
        current = context.nodeResults[nodeId].output;
        // Navigate remaining path
        for (let i = 1; i < parts.length; i++) {
          if (current === undefined || current === null) return undefined;
          current = current[parts[i]];
        }
        return current;
      }
    }

    // Fallback: direct path navigation
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }

    return current;
  }

  private findNodeIdByLabel(context: any, label: string): string | undefined {
    if (context.workflowDefinition?.nodes) {
      const node = context.workflowDefinition.nodes.find((n: any) => n.name === label);
      return node?.id;
    }
    return undefined;
  }

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    const config = input.config.config as unknown as any;

    // Backward compatibility: Convert old format to new format
    let conditions: ConditionItem[];
    let enableDefault: boolean;

    if (config.conditions) {
      // New format
      conditions = config.conditions;
      enableDefault = config.enableDefault !== false;
    } else if (config.expression) {
      // Old format: single expression
      conditions = [
        { id: 'true', label: 'True', expression: config.expression },
      ];
      enableDefault = false;
    } else {
      // No config at all
      throw new Error('Condition node requires either conditions array or expression');
    }

    // First-Match: Evaluate conditions in order
    for (const condition of conditions) {
      // Resolve {{}} templates in expression
      const resolvedExpression = this.resolveTemplates(condition.expression, input.context);
      
      const result = await this.expressionService.evaluateBoolean(
        resolvedExpression,
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
    if (enableDefault) {
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
