import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Landlord database schema - stores tenant information
// Each tenant gets their own separate SQLite database

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(), // ULID
  hrworksOrgId: text('hrworks_org_id').notNull().unique(),
  name: text('name').notNull(),
  dbPath: text('db_path').notNull(), // Path to tenant's SQLite database
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  settings: text('settings', { mode: 'json' }).$type<TenantSettingsJson>().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export interface TenantSettingsJson {
  hrworksApiKey?: string;
  hrworksApiSecret?: string;
  hrworksApiBaseUrl?: string;
  hrworksTenant?: string;
  webhookSecret?: string;
  syncEnabled: boolean;
  lastSyncAt?: string; // ISO date string
}

export type TenantRecord = typeof tenants.$inferSelect;
export type NewTenantRecord = typeof tenants.$inferInsert;
