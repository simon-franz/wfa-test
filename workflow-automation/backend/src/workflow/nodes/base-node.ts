import type { ExecutionContext, NodeExecutionResult, BaseNodeConfig } from 'shared/types';

export interface NodeExecutionInput {
  config: BaseNodeConfig;
  context: ExecutionContext;
}

export interface NodeExecutionOutput {
  output?: unknown;
  nextNodes?: string[]; // For conditional nodes to specify which paths to take
}

export abstract class BaseNode {
  abstract readonly type: string;
  abstract readonly category: 'trigger' | 'action' | 'logic';

  abstract execute(input: NodeExecutionInput): Promise<NodeExecutionOutput>;

  // Validate node configuration
  validate(config: BaseNodeConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.id) {
      errors.push('Node ID is required');
    }

    if (!config.name) {
      errors.push('Node name is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Get default configuration for this node type
  getDefaultConfig(): Record<string, unknown> {
    return {};
  }

  // Get schema for node configuration (for UI)
  abstract getConfigSchema(): Record<string, unknown>;
}

// Helper to create node execution result
export function createNodeResult(
  nodeId: string,
  status: NodeExecutionResult['status'],
  output?: unknown,
  error?: string,
): NodeExecutionResult {
  return {
    nodeId,
    status,
    output,
    error,
    startedAt: new Date(),
    completedAt: status !== 'running' ? new Date() : undefined,
  };
}
