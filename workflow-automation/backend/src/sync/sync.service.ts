import { Injectable, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { syncedPersons, syncedOrganizationUnits } from 'shared/db';
import { ulid } from 'shared/utils';
import type { HRWorksPerson, HRWorksOrganizationUnit, SyncStatus } from 'shared/types';
import { TenantManager } from '../db/tenant-manager';
import { HrworksApiService } from '../hrworks/hrworks-api.service';
import { LandlordService } from '../db/landlord.service';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private tenantManager: TenantManager,
    private hrworksApi: HrworksApiService,
    private landlordService: LandlordService,
  ) {}

  async fullSync(tenantId: string): Promise<SyncStatus> {
    this.logger.log(`Starting full sync for tenant: ${tenantId}`);

    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();

    try {
      // Sync organization units first (persons may reference them)
      const orgUnits = await this.hrworksApi.getAllOrganizationUnits(tenantId);
      await this.syncOrganizationUnits(tenantId, orgUnits);

      // Sync persons
      const persons = await this.hrworksApi.getAllPersons(tenantId);
      await this.syncPersons(tenantId, persons);

      // Update tenant settings with last sync time
      const tenant = await this.landlordService.findTenantById(tenantId);
      if (tenant) {
        await this.landlordService.updateTenant(tenantId, {
          settings: {
            ...tenant.settings,
            lastSyncAt: now.toISOString(),
          },
        });
      }

      // Get counts
      const personsCount = db.select().from(syncedPersons).all().length;
      const orgUnitsCount = db.select().from(syncedOrganizationUnits).all().length;

      this.logger.log(`Full sync completed for tenant: ${tenantId}`);

      return {
        tenantId,
        lastFullSync: now,
        personsCount,
        orgUnitsCount,
        status: 'idle',
      };
    } catch (error) {
      this.logger.error(`Full sync failed for tenant: ${tenantId}`, error);
      throw error;
    }
  }

  private async syncOrganizationUnits(tenantId: string, orgUnits: HRWorksOrganizationUnit[]) {
    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();

    // Create a map of hrworksOrgUnitId to our internal ULID
    const idMap = new Map<string, string>();

    // First pass: create/update all org units without parent references
    for (const ou of orgUnits) {
      const existing = db
        .select()
        .from(syncedOrganizationUnits)
        .where(eq(syncedOrganizationUnits.hrworksOrgUnitId, ou.id))
        .get();

      const id = existing?.id || ulid();
      idMap.set(ou.id, id);

      if (existing) {
        db.update(syncedOrganizationUnits)
          .set({
            name: ou.name,
            costCenter: ou.costCenter,
            level: ou.level,
            rawData: ou as unknown as Record<string, unknown>,
            lastSyncedAt: now,
            updatedAt: now,
          })
          .where(eq(syncedOrganizationUnits.id, existing.id))
          .run();
      } else {
        db.insert(syncedOrganizationUnits)
          .values({
            id,
            hrworksOrgUnitId: ou.id,
            name: ou.name,
            costCenter: ou.costCenter,
            level: ou.level,
            rawData: ou as unknown as Record<string, unknown>,
            lastSyncedAt: now,
            createdAt: now,
            updatedAt: now,
          })
          .run();
      }
    }

    // Second pass: update parent references
    for (const ou of orgUnits) {
      if (ou.parentId) {
        const id = idMap.get(ou.id);
        const parentId = idMap.get(ou.parentId);

        if (id && parentId) {
          db.update(syncedOrganizationUnits)
            .set({ parentId })
            .where(eq(syncedOrganizationUnits.id, id))
            .run();
        }
      }
    }

    this.logger.log(`Synced ${orgUnits.length} organization units`);
  }

  private async syncPersons(tenantId: string, persons: HRWorksPerson[]) {
    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();

    // Get org unit ID mapping
    const orgUnits = db.select().from(syncedOrganizationUnits).all();
    const orgUnitMap = new Map(orgUnits.map((ou) => [ou.hrworksOrgUnitId, ou.id]));

    for (const person of persons) {
      const existing = db
        .select()
        .from(syncedPersons)
        .where(eq(syncedPersons.hrworksPersonnelNumber, person.personnelNumber))
        .get();

      const organizationUnitId = person.organizationUnitId
        ? orgUnitMap.get(person.organizationUnitId)
        : undefined;

      if (existing) {
        db.update(syncedPersons)
          .set({
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email,
            organizationUnitId,
            position: person.position,
            status: person.status,
            rawData: person as unknown as Record<string, unknown>,
            lastSyncedAt: now,
            updatedAt: now,
          })
          .where(eq(syncedPersons.id, existing.id))
          .run();
      } else {
        db.insert(syncedPersons)
          .values({
            id: ulid(),
            hrworksPersonnelNumber: person.personnelNumber,
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email,
            organizationUnitId,
            position: person.position,
            status: person.status,
            rawData: person as unknown as Record<string, unknown>,
            lastSyncedAt: now,
            createdAt: now,
            updatedAt: now,
          })
          .run();
      }
    }

    this.logger.log(`Synced ${persons.length} persons`);
  }

  async upsertPerson(tenantId: string, person: HRWorksPerson) {
    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();

    // Get org unit mapping
    const orgUnit = person.organizationUnitId
      ? db
          .select()
          .from(syncedOrganizationUnits)
          .where(eq(syncedOrganizationUnits.hrworksOrgUnitId, person.organizationUnitId))
          .get()
      : undefined;

    const existing = db
      .select()
      .from(syncedPersons)
      .where(eq(syncedPersons.hrworksPersonnelNumber, person.personnelNumber))
      .get();

    if (existing) {
      db.update(syncedPersons)
        .set({
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
          organizationUnitId: orgUnit?.id,
          position: person.position,
          status: person.status,
          rawData: person as unknown as Record<string, unknown>,
          lastSyncedAt: now,
          updatedAt: now,
        })
        .where(eq(syncedPersons.id, existing.id))
        .run();
    } else {
      db.insert(syncedPersons)
        .values({
          id: ulid(),
          hrworksPersonnelNumber: person.personnelNumber,
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
          organizationUnitId: orgUnit?.id,
          position: person.position,
          status: person.status,
          rawData: person as unknown as Record<string, unknown>,
          lastSyncedAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .run();
    }
  }

  async deletePerson(tenantId: string, personnelNumber: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    db.delete(syncedPersons)
      .where(eq(syncedPersons.hrworksPersonnelNumber, personnelNumber))
      .run();
  }

  async upsertOrganizationUnit(tenantId: string, orgUnit: HRWorksOrganizationUnit) {
    const db = await this.tenantManager.getConnection(tenantId);
    const now = new Date();

    const existing = db
      .select()
      .from(syncedOrganizationUnits)
      .where(eq(syncedOrganizationUnits.hrworksOrgUnitId, orgUnit.id))
      .get();

    // Get parent ID if exists
    const parent = orgUnit.parentId
      ? db
          .select()
          .from(syncedOrganizationUnits)
          .where(eq(syncedOrganizationUnits.hrworksOrgUnitId, orgUnit.parentId))
          .get()
      : undefined;

    if (existing) {
      db.update(syncedOrganizationUnits)
        .set({
          name: orgUnit.name,
          parentId: parent?.id,
          costCenter: orgUnit.costCenter,
          level: orgUnit.level,
          rawData: orgUnit as unknown as Record<string, unknown>,
          lastSyncedAt: now,
          updatedAt: now,
        })
        .where(eq(syncedOrganizationUnits.id, existing.id))
        .run();
    } else {
      db.insert(syncedOrganizationUnits)
        .values({
          id: ulid(),
          hrworksOrgUnitId: orgUnit.id,
          name: orgUnit.name,
          parentId: parent?.id,
          costCenter: orgUnit.costCenter,
          level: orgUnit.level,
          rawData: orgUnit as unknown as Record<string, unknown>,
          lastSyncedAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .run();
    }
  }

  async deleteOrganizationUnit(tenantId: string, hrworksOrgUnitId: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    db.delete(syncedOrganizationUnits)
      .where(eq(syncedOrganizationUnits.hrworksOrgUnitId, hrworksOrgUnitId))
      .run();
  }

  async getPersons(tenantId: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    return db.select().from(syncedPersons).all();
  }

  async getOrganizationUnits(tenantId: string) {
    const db = await this.tenantManager.getConnection(tenantId);
    return db.select().from(syncedOrganizationUnits).all();
  }

  async getSyncStatus(tenantId: string): Promise<SyncStatus> {
    const db = await this.tenantManager.getConnection(tenantId);
    const tenant = await this.landlordService.findTenantById(tenantId);

    const personsCount = db.select().from(syncedPersons).all().length;
    const orgUnitsCount = db.select().from(syncedOrganizationUnits).all().length;

    return {
      tenantId,
      lastFullSync: tenant?.settings.lastSyncAt ? new Date(tenant.settings.lastSyncAt) : undefined,
      personsCount,
      orgUnitsCount,
      status: 'idle',
    };
  }
}
