import { Injectable } from '@nestjs/common';
import jsonata from 'jsonata';
import type { ExecutionContext } from 'shared/types';

@Injectable()
export class ExpressionService {
  private expressionCache: Map<string, jsonata.Expression> = new Map();

  async evaluate(expression: string, context: ExecutionContext): Promise<unknown> {
    try {
      let compiled = this.expressionCache.get(expression);

      if (!compiled) {
        compiled = jsonata(expression);
        this.expressionCache.set(expression, compiled);
      }

      // Build evaluation context with access to variables and node results
      const evalContext = {
        $vars: context.variables,
        $nodes: context.nodeResults,
        $trigger: context.trigger,
        $env: {
          workflowId: context.workflowId,
          executionId: context.executionId,
          tenantId: context.tenantId,
        },
      };

      return await compiled.evaluate(evalContext);
    } catch (error) {
      throw new Error(`Expression evaluation failed: ${(error as Error).message}`);
    }
  }

  async evaluateBoolean(expression: string, context: ExecutionContext): Promise<boolean> {
    const result = await this.evaluate(expression, context);
    return Boolean(result);
  }

  async evaluateString(expression: string, context: ExecutionContext): Promise<string> {
    const result = await this.evaluate(expression, context);
    return String(result);
  }

  // Interpolate expressions in a string template
  // e.g., "Hello {{$nodes.getData.output.name}}" -> "Hello John"
  async interpolate(template: string, context: ExecutionContext): Promise<string> {
    const expressionRegex = /\{\{(.+?)\}\}/g;
    let result = template;
    let match;

    while ((match = expressionRegex.exec(template)) !== null) {
      const expression = match[1].trim();
      const value = await this.evaluate(expression, context);
      result = result.replace(match[0], String(value ?? ''));
    }

    return result;
  }

  // Validate an expression without evaluating it
  validate(expression: string): { valid: boolean; error?: string } {
    try {
      jsonata(expression);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }

  clearCache() {
    this.expressionCache.clear();
  }
}
