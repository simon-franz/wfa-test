import { Injectable } from '@nestjs/common';
import { BaseNode, type NodeExecutionInput, type NodeExecutionOutput } from '../base-node';

interface CalculationConfig {
  operation: 'addWeeks' | 'addDays' | 'addMonths' | 'addYears' | 'subtractWeeks' | 'subtractDays' | 'subtractMonths' | 'subtractYears';
  inputValue: string; // Template string like {{global.currentDate}} or {{node.field}}
  amount: number;
  outputField: string;
}

@Injectable()
export class CalculationNode extends BaseNode {
  readonly type = 'calculation';
  readonly category = 'logic' as const;

  async execute(input: NodeExecutionInput): Promise<NodeExecutionOutput> {
    const config = input.config.config as any as CalculationConfig;
    
    if (!config.operation || !config.inputValue || config.amount === undefined) {
      throw new Error('Calculation node requires operation, inputValue, and amount');
    }

    // Resolve template in inputValue
    const resolvedValue = this.resolveTemplate(config.inputValue, input.context);
    
    let result: string;
    
    // Parse date
    const date = new Date(resolvedValue);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${resolvedValue}`);
    }

    // Perform calculation
    switch (config.operation) {
      case 'addWeeks':
        date.setDate(date.getDate() + config.amount * 7);
        break;
      case 'subtractWeeks':
        date.setDate(date.getDate() - config.amount * 7);
        break;
      case 'addDays':
        date.setDate(date.getDate() + config.amount);
        break;
      case 'subtractDays':
        date.setDate(date.getDate() - config.amount);
        break;
      case 'addMonths':
        date.setMonth(date.getMonth() + config.amount);
        break;
      case 'subtractMonths':
        date.setMonth(date.getMonth() - config.amount);
        break;
      case 'addYears':
        date.setFullYear(date.getFullYear() + config.amount);
        break;
      case 'subtractYears':
        date.setFullYear(date.getFullYear() - config.amount);
        break;
    }

    result = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return {
      output: { result },
    };
  }

  private resolveTemplate(template: string, context: any): string {
    if (!template || typeof template !== 'string') return template;

    return template.replace(/\{\{(.+?)\}\}/g, (match, path) => {
      const trimmedPath = path.trim();
      const cleanPath = trimmedPath.replace(/\.output\./g, '.').replace(/\.output$/g, '');
      const value = this.getValueByPath(context, cleanPath);
      return value !== undefined ? String(value) : match;
    });
  }

  private getValueByPath(context: any, path: string): any {
    if (!path) return undefined;

    // Handle array bracket notation: convert persons[0] to persons.0
    const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1');
    const parts = normalizedPath.split('.');
    let current = context;

    // Check for context scopes
    if (parts[0] === 'global' && context.globalContext) {
      current = context.globalContext;
      for (let i = 1; i < parts.length; i++) {
        if (current === undefined || current === null) return undefined;
        current = current[parts[i]];
      }
      return current;
    }

    if (parts[0] === 'workflow' && context.workflowContext) {
      current = context.workflowContext;
      for (let i = 1; i < parts.length; i++) {
        if (current === undefined || current === null) return undefined;
        current = current[parts[i]];
      }
      return current;
    }

    if (parts[0] === 'execution' && context.executionContext) {
      current = context.executionContext;
      for (let i = 1; i < parts.length; i++) {
        if (current === undefined || current === null) return undefined;
        current = current[parts[i]];
      }
      return current;
    }

    // Try nodeResults
    if (context.nodeResults) {
      const nodeName = parts[0];
      
      if (context.nodeResults[nodeName]) {
        current = context.nodeResults[nodeName].output;
        for (let i = 1; i < parts.length; i++) {
          if (current === undefined || current === null) return undefined;
          current = current[parts[i]];
        }
        return current;
      }

      const nodeId = this.findNodeIdByLabel(context, nodeName);
      if (nodeId && context.nodeResults[nodeId]) {
        current = context.nodeResults[nodeId].output;
        for (let i = 1; i < parts.length; i++) {
          if (current === undefined || current === null) return undefined;
          current = current[parts[i]];
        }
        return current;
      }
    }

    // Fallback
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }

    return current;
  }

  private findNodeIdByLabel(context: any, label: string): string | undefined {
    if (!context.workflowDefinition?.nodes) return undefined;

    const normalizedLabel = this.normalizeLabelToCamelCase(label);
    
    for (const node of context.workflowDefinition.nodes) {
      const normalizedNodeName = this.normalizeLabelToCamelCase(node.name);
      if (normalizedNodeName === normalizedLabel) {
        return node.id;
      }
    }

    return undefined;
  }

  private normalizeLabelToCamelCase(label: string): string {
    const words = label.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    if (words.length === 0) return '';
    return words.map((word, index) => {
      if (index === 0) return word.charAt(0).toLowerCase() + word.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  }

  getConfigSchema(): Record<string, unknown> {
    return {
      operation: { type: 'string', required: true },
      inputValue: { type: 'string', required: true },
      amount: { type: 'number', required: true },
      outputField: { type: 'string', required: false },
    };
  }
}
