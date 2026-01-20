import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { tenants, type TenantRecord, type NewTenantRecord, type TenantSettingsJson } from 'shared/db';
import { ulid } from 'shared/utils';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LandlordService implements OnModuleInit, OnModuleDestroy {
  private sqlite: Database.Database | null = null;
  private db: BetterSQLite3Database | null = null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const dbPath = this.configService.get<string>('DATABASE_URL') || './dev-tenants/landlord.db';

    // Ensure directory exists
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    this.sqlite = new Database(dbPath);
    this.db = drizzle(this.sqlite);

    // Create tenants table if not exists
    this.sqlite.exec(`
      CREATE TABLE IF NOT EXISTS tenants (
        id TEXT PRIMARY KEY,
        hrworks_org_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        db_path TEXT NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        settings TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);
  }

  async onModuleDestroy() {
    if (this.sqlite) {
      this.sqlite.close();
    }
  }

  getDb(): BetterSQLite3Database {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  async findTenantById(id: string): Promise<TenantRecord | undefined> {
    const result = this.getDb().select().from(tenants).where(eq(tenants.id, id)).get();
    return result;
  }

  async findTenantByHrworksOrgId(hrworksOrgId: string): Promise<TenantRecord | undefined> {
    const result = this.getDb()
      .select()
      .from(tenants)
      .where(eq(tenants.hrworksOrgId, hrworksOrgId))
      .get();
    return result;
  }

  async createTenant(data: Omit<NewTenantRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<TenantRecord> {
    const now = new Date();
    const id = ulid();
    const dbPath = `./dev-tenants/${id}.db`;

    const newTenant: NewTenantRecord = {
      ...data,
      id,
      dbPath,
      createdAt: now,
      updatedAt: now,
    };

    this.getDb().insert(tenants).values(newTenant).run();

    const created = await this.findTenantById(id);
    if (!created) {
      throw new Error('Failed to create tenant');
    }

    return created;
  }

  async updateTenant(id: string, data: Partial<TenantRecord>): Promise<TenantRecord | undefined> {
    const now = new Date();

    this.getDb()
      .update(tenants)
      .set({ ...data, updatedAt: now })
      .where(eq(tenants.id, id))
      .run();

    return this.findTenantById(id);
  }

  async updateTenantSettings(id: string, settings: Partial<TenantSettingsJson>): Promise<void> {
    const tenant = await this.findTenantById(id);
    if (!tenant) {
      throw new Error(`Tenant not found: ${id}`);
    }
    await this.updateTenant(id, {
      settings: { ...tenant.settings, ...settings },
    });
  }

  async listTenants(): Promise<TenantRecord[]> {
    return this.getDb().select().from(tenants).all();
  }
}
