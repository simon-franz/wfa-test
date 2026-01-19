import type { ULID, WorkflowStatus, ExecutionStatus, NodeStatus, Timestamps } from './common.types.js';

// Node position in the canvas
export interface NodePosition {
  x: number;
  y: number;
}

// Base node configuration
export interface BaseNodeConfig {
  id: string;
  type: NodeType;
  name: string;
  position: NodePosition;
  config: Record<string, unknown>;
}

// Node types available in Phase 1
export type NodeType =
  | 'manual-trigger'
  | 'scheduled-trigger'
  | 'http-request'
  | 'condition'
  | 'delay';

// Trigger node configs
export interface ManualTriggerConfig {
  description?: string;
}

export interface ScheduledTriggerConfig {
  cronExpression: string;
  timezone?: string;
}

// Action node configs
export interface HttpRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
  retries?: number;
}

export interface ConditionConfig {
  expression: string; // JSONata expression
}

export interface DelayConfig {
  duration: number; // milliseconds
  unit: 'seconds' | 'minutes' | 'hours' | 'days';
}

// Edge/Connection between nodes
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string; // For condition nodes: 'true' | 'false'
  targetHandle?: string;
}

// Complete workflow definition
export interface WorkflowDefinition {
  nodes: BaseNodeConfig[];
  edges: WorkflowEdge[];
  variables?: Record<string, unknown>;
}

// Workflow entity
export interface Workflow extends Timestamps {
  id: ULID;
  tenantId: ULID;
  name: string;
  description?: string;
  status: WorkflowStatus;
  definition: WorkflowDefinition;
  version: number;
  createdBy: ULID;
  updatedBy?: ULID;
}

// Workflow execution
export interface WorkflowExecution extends Timestamps {
  id: ULID;
  workflowId: ULID;
  tenantId: ULID;
  status: ExecutionStatus;
  triggeredBy: 'manual' | 'scheduled' | 'webhook';
  triggeredByUserId?: ULID;
  startedAt?: Date;
  completedAt?: Date;
  context: ExecutionContext;
  error?: string;
}

// Execution context passed between nodes
export interface ExecutionContext {
  workflowId: ULID;
  executionId: ULID;
  tenantId: ULID;
  variables: Record<string, unknown>;
  nodeResults: Record<string, NodeExecutionResult>;
  trigger?: {
    type: string;
    payload?: Record<string, unknown>;
  };
}

// Individual node execution result
export interface NodeExecutionResult {
  nodeId: string;
  status: NodeStatus;
  output?: unknown;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
}

// Workflow creation/update DTOs
export interface CreateWorkflowDto {
  name: string;
  description?: string;
  definition: WorkflowDefinition;
}

export interface UpdateWorkflowDto {
  name?: string;
  description?: string;
  status?: WorkflowStatus;
  definition?: WorkflowDefinition;
}
