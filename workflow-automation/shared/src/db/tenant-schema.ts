import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// Tenant database schema - each tenant has their own database with these tables

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // ULID
  hrworksPersonId: text('hrworks_person_id').notNull().unique(),
  email: text('email').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: text('role', { enum: ['admin', 'editor', 'viewer'] }).notNull().default('viewer'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}));

// Synced persons from HR WORKS
export const syncedPersons = sqliteTable('synced_persons', {
  id: text('id').primaryKey(), // ULID
  hrworksPersonnelNumber: text('hrworks_personnel_number').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  organizationUnitId: text('organization_unit_id').references(() => syncedOrganizationUnits.id),
  position: text('position'),
  status: text('status', { enum: ['active', 'inactive', 'pending'] }).notNull().default('active'),
  rawData: text('raw_data', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
  lastSyncedAt: integer('last_synced_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  statusIdx: index('synced_persons_status_idx').on(table.status),
  orgUnitIdx: index('synced_persons_org_unit_idx').on(table.organizationUnitId),
}));

// Synced organization units from HR WORKS
export const syncedOrganizationUnits = sqliteTable('synced_organization_units', {
  id: text('id').primaryKey(), // ULID
  hrworksOrgUnitId: text('hrworks_org_unit_id').notNull().unique(),
  name: text('name').notNull(),
  parentId: text('parent_id'),
  costCenter: text('cost_center'),
  managerId: text('manager_id'),
  level: integer('level').notNull().default(0),
  rawData: text('raw_data', { mode: 'json' }).$type<Record<string, unknown>>().notNull(),
  lastSyncedAt: integer('last_synced_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  parentIdx: index('synced_org_units_parent_idx').on(table.parentId),
}));

// Workflows
export const workflows = sqliteTable('workflows', {
  id: text('id').primaryKey(), // ULID
  name: text('name').notNull(),
  description: text('description'),
  status: text('status', { enum: ['draft', 'active', 'inactive', 'archived'] }).notNull().default('draft'),
  definition: text('definition', { mode: 'json' }).$type<WorkflowDefinitionJson>().notNull(),
  version: integer('version').notNull().default(1),
  createdBy: text('created_by').notNull().references(() => users.id),
  updatedBy: text('updated_by').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  statusIdx: index('workflows_status_idx').on(table.status),
  createdByIdx: index('workflows_created_by_idx').on(table.createdBy),
}));

// Workflow executions
export const workflowExecutions = sqliteTable('workflow_executions', {
  id: text('id').primaryKey(), // ULID
  workflowId: text('workflow_id').notNull().references(() => workflows.id),
  status: text('status', { enum: ['pending', 'running', 'completed', 'failed', 'cancelled'] }).notNull().default('pending'),
  triggeredBy: text('triggered_by', { enum: ['manual', 'scheduled', 'webhook'] }).notNull(),
  triggeredByUserId: text('triggered_by_user_id').references(() => users.id),
  context: text('context', { mode: 'json' }).$type<ExecutionContextJson>().notNull(),
  error: text('error'),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
}, (table) => ({
  workflowIdx: index('executions_workflow_idx').on(table.workflowId),
  statusIdx: index('executions_status_idx').on(table.status),
  createdAtIdx: index('executions_created_at_idx').on(table.createdAt),
}));

// Type definitions for JSON fields
export interface WorkflowDefinitionJson {
  nodes: Array<{
    id: string;
    type: string;
    name: string;
    position: { x: number; y: number };
    config: Record<string, unknown>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }>;
  variables?: Record<string, unknown>;
}

export interface ExecutionContextJson {
  workflowId: string;
  executionId: string;
  variables: Record<string, unknown>;
  nodeResults: Record<string, NodeExecutionResultJson>;
  trigger?: {
    type: string;
    payload?: Record<string, unknown>;
  };
}

export interface NodeExecutionResultJson {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  output?: unknown;
  error?: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
}

// Inferred types
export type UserRecord = typeof users.$inferSelect;
export type NewUserRecord = typeof users.$inferInsert;

export type SyncedPersonRecord = typeof syncedPersons.$inferSelect;
export type NewSyncedPersonRecord = typeof syncedPersons.$inferInsert;

export type SyncedOrgUnitRecord = typeof syncedOrganizationUnits.$inferSelect;
export type NewSyncedOrgUnitRecord = typeof syncedOrganizationUnits.$inferInsert;

export type WorkflowRecord = typeof workflows.$inferSelect;
export type NewWorkflowRecord = typeof workflows.$inferInsert;

export type WorkflowExecutionRecord = typeof workflowExecutions.$inferSelect;
export type NewWorkflowExecutionRecord = typeof workflowExecutions.$inferInsert;
