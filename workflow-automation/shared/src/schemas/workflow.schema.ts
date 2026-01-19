import { z } from 'zod';

export const nodePositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const nodeTypeSchema = z.enum([
  'manual-trigger',
  'scheduled-trigger',
  'http-request',
  'condition',
  'delay',
]);

export const baseNodeConfigSchema = z.object({
  id: z.string(),
  type: nodeTypeSchema,
  name: z.string().min(1).max(100),
  position: nodePositionSchema,
  config: z.record(z.unknown()),
});

export const workflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
});

export const workflowDefinitionSchema = z.object({
  nodes: z.array(baseNodeConfigSchema),
  edges: z.array(workflowEdgeSchema),
  variables: z.record(z.unknown()).optional(),
});

export const workflowStatusSchema = z.enum(['draft', 'active', 'inactive', 'archived']);

export const createWorkflowSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  definition: workflowDefinitionSchema,
});

export const updateWorkflowSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  status: workflowStatusSchema.optional(),
  definition: workflowDefinitionSchema.optional(),
});

// Node-specific config schemas
export const manualTriggerConfigSchema = z.object({
  description: z.string().max(500).optional(),
});

export const scheduledTriggerConfigSchema = z.object({
  cronExpression: z.string().min(1),
  timezone: z.string().optional().default('UTC'),
});

export const httpRequestConfigSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  url: z.string().url(),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
  timeout: z.number().min(1000).max(300000).optional().default(30000),
  retries: z.number().min(0).max(5).optional().default(0),
});

export const conditionConfigSchema = z.object({
  expression: z.string().min(1),
});

export const delayConfigSchema = z.object({
  duration: z.number().min(1),
  unit: z.enum(['seconds', 'minutes', 'hours', 'days']),
});

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
