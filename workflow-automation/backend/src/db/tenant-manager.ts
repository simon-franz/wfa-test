import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { LandlordService } from './landlord.service';
import * as fs from 'fs';
import * as path from 'path';

interface TenantConnection {
  sqlite: Database.Database;
  db: BetterSQLite3Database;
  lastAccessed: number;
}

const TENANT_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    hrworks_person_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK(role IN ('admin', 'editor', 'viewer')),
    is_active INTEGER NOT NULL DEFAULT 1,
    last_login_at INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);

  CREATE TABLE IF NOT EXISTS synced_organization_units (
    id TEXT PRIMARY KEY,
    hrworks_org_unit_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    parent_id TEXT,
    cost_center TEXT,
    manager_id TEXT,
    level INTEGER NOT NULL DEFAULT 0,
    raw_data TEXT NOT NULL,
    last_synced_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS synced_org_units_parent_idx ON synced_organization_units(parent_id);

  CREATE TABLE IF NOT EXISTS synced_persons (
    id TEXT PRIMARY KEY,
    hrworks_personnel_number TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    organization_unit_id TEXT REFERENCES synced_organization_units(id),
    position TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'pending')),
    raw_data TEXT NOT NULL,
    last_synced_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS synced_persons_status_idx ON synced_persons(status);
  CREATE INDEX IF NOT EXISTS synced_persons_org_unit_idx ON synced_persons(organization_unit_id);

  CREATE TABLE IF NOT EXISTS workflows (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'inactive', 'archived')),
    definition TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    created_by TEXT NOT NULL REFERENCES users(id),
    updated_by TEXT REFERENCES users(id),
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS workflows_status_idx ON workflows(status);
  CREATE INDEX IF NOT EXISTS workflows_created_by_idx ON workflows(created_by);

  CREATE TABLE IF NOT EXISTS workflow_executions (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL REFERENCES workflows(id),
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'running', 'waiting', 'completed', 'failed', 'cancelled')),
    triggered_by TEXT NOT NULL CHECK(triggered_by IN ('manual', 'scheduled', 'webhook')),
    triggered_by_user_id TEXT REFERENCES users(id),
    context TEXT NOT NULL,
    error TEXT,
    started_at INTEGER,
    completed_at INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE INDEX IF NOT EXISTS executions_workflow_idx ON workflow_executions(workflow_id);
  CREATE INDEX IF NOT EXISTS executions_status_idx ON workflow_executions(status);
  CREATE INDEX IF NOT EXISTS executions_created_at_idx ON workflow_executions(created_at);
`;

@Injectable()
export class TenantManager implements OnModuleDestroy {
  private connections: Map<string, TenantConnection> = new Map();
  private readonly maxConnections = 50;
  private readonly connectionTimeout = 5 * 60 * 1000; // 5 minutes
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(private landlordService: LandlordService) {
    // Start cleanup interval
    this.cleanupInterval = setInterval(() => this.cleanupIdleConnections(), 60000);
  }

  async onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Close all connections
    for (const [, connection] of this.connections) {
      connection.sqlite.close();
    }
    this.connections.clear();
  }

  async getConnection(tenantId: string): Promise<BetterSQLite3Database> {
    // Check if connection exists
    const existing = this.connections.get(tenantId);
    if (existing) {
      existing.lastAccessed = Date.now();
      return existing.db;
    }

    // Get tenant info
    const tenant = await this.landlordService.findTenantById(tenantId);
    if (!tenant) {
      throw new Error(`Tenant not found: ${tenantId}`);
    }

    if (!tenant.isActive) {
      throw new Error(`Tenant is inactive: ${tenantId}`);
    }

    // Enforce max connections
    if (this.connections.size >= this.maxConnections) {
      this.evictOldestConnection();
    }

    // Create new connection
    const dbDir = path.dirname(tenant.dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const sqlite = new Database(tenant.dbPath);
    const db = drizzle(sqlite);

    // Initialize schema
    sqlite.exec(TENANT_SCHEMA_SQL);

    const connection: TenantConnection = {
      sqlite,
      db,
      lastAccessed: Date.now(),
    };

    this.connections.set(tenantId, connection);

    return db;
  }

  private evictOldestConnection() {
    let oldest: { tenantId: string; time: number } | null = null;

    for (const [tenantId, connection] of this.connections) {
      if (!oldest || connection.lastAccessed < oldest.time) {
        oldest = { tenantId, time: connection.lastAccessed };
      }
    }

    if (oldest) {
      const connection = this.connections.get(oldest.tenantId);
      if (connection) {
        connection.sqlite.close();
        this.connections.delete(oldest.tenantId);
      }
    }
  }

  private cleanupIdleConnections() {
    const now = Date.now();

    for (const [tenantId, connection] of this.connections) {
      if (now - connection.lastAccessed > this.connectionTimeout) {
        connection.sqlite.close();
        this.connections.delete(tenantId);
      }
    }
  }

  closeConnection(tenantId: string) {
    const connection = this.connections.get(tenantId);
    if (connection) {
      connection.sqlite.close();
      this.connections.delete(tenantId);
    }
  }
}
