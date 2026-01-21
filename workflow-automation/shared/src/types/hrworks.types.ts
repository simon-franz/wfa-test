import type { ULID, Timestamps } from './common.types';

// HR WORKS API types

export interface HRWorksAuthResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

export interface HRWorksPerson {
  personnelNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  organizationUnitId: string;
  position?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
  status: 'active' | 'inactive' | 'pending';
  customFields?: Record<string, unknown>;
}

export interface HRWorksOrganizationUnit {
  id: string;
  name: string;
  parentId?: string;
  costCenter?: string;
  managerId?: string;
  level: number;
}

export interface HRWorksWebhookPayload {
  event: HRWorksWebhookEvent;
  timestamp: string;
  data: HRWorksPerson | HRWorksOrganizationUnit;
  signature: string;
}

export type HRWorksWebhookEvent =
  | 'person.created'
  | 'person.updated'
  | 'person.deleted'
  | 'organization_unit.created'
  | 'organization_unit.updated'
  | 'organization_unit.deleted';

// Synced entities stored locally

export interface SyncedPerson extends Timestamps {
  id: ULID;
  tenantId: ULID;
  hrworksPersonnelNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  organizationUnitId?: ULID;
  position?: string;
  status: 'active' | 'inactive' | 'pending';
  rawData: Record<string, unknown>;
  lastSyncedAt: Date;
}

export interface SyncedOrganizationUnit extends Timestamps {
  id: ULID;
  tenantId: ULID;
  hrworksOrgUnitId: string;
  name: string;
  parentId?: ULID;
  costCenter?: string;
  managerId?: ULID;
  level: number;
  rawData: Record<string, unknown>;
  lastSyncedAt: Date;
}

export interface SyncStatus {
  tenantId: ULID;
  lastFullSync?: Date;
  lastIncrementalSync?: Date;
  personsCount: number;
  orgUnitsCount: number;
  status: 'idle' | 'syncing' | 'error';
  lastError?: string;
}
