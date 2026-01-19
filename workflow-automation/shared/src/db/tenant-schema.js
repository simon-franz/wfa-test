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
    rawData: text('raw_data', { mode: 'json' }).$type().notNull(),
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
    rawData: text('raw_data', { mode: 'json' }).$type().notNull(),
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
    definition: text('definition', { mode: 'json' }).$type().notNull(),
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
    context: text('context', { mode: 'json' }).$type().notNull(),
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
//# sourceMappingURL=tenant-schema.js.map