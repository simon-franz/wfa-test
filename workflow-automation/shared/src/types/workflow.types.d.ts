import type { ULID, WorkflowStatus, ExecutionStatus, NodeStatus, Timestamps } from './common.types';
export interface NodePosition {
    x: number;
    y: number;
}
export interface BaseNodeConfig {
    id: string;
    type: NodeType;
    name: string;
    position: NodePosition;
    config: Record<string, unknown>;
}
export type NodeType = 'manual-trigger' | 'scheduled-trigger' | 'http-request' | 'condition' | 'delay';
export interface ManualTriggerConfig {
    description?: string;
}
export interface ScheduledTriggerConfig {
    cronExpression: string;
    timezone?: string;
}
export interface HttpRequestConfig {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: string;
    timeout?: number;
    retries?: number;
}
export interface ConditionConfig {
    expression: string;
}
export interface DelayConfig {
    duration: number;
    unit: 'seconds' | 'minutes' | 'hours' | 'days';
}
export interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
}
export interface WorkflowDefinition {
    nodes: BaseNodeConfig[];
    edges: WorkflowEdge[];
    variables?: Record<string, unknown>;
}
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
export interface GlobalContext {
    currentDate: string;
    currentTime: string;
    currentDateTime: string;
    weekday: string;
}
export interface WorkflowContext {
    name: string;
    id: ULID;
    variables: Record<string, unknown>;
}
export interface ExecutionContextVariables {
    variables: Record<string, unknown>;
}
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
    workflowDefinition?: WorkflowDefinition;
    globalContext?: GlobalContext;
    workflowContext?: WorkflowContext;
    executionContext?: ExecutionContextVariables;
}
export interface NodeExecutionResult {
    nodeId: string;
    status: NodeStatus;
    output?: unknown;
    error?: string;
    startedAt: Date;
    completedAt?: Date;
    duration?: number;
    nextNodes?: string[];
}
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
//# sourceMappingURL=workflow.types.d.ts.map