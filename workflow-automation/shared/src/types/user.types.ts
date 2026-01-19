import type { ULID, Timestamps } from './common.types';

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User extends Timestamps {
  id: ULID;
  tenantId: ULID;
  hrworksPersonId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface Tenant extends Timestamps {
  id: ULID;
  hrworksOrgId: string;
  name: string;
  isActive: boolean;
  dbPath: string; // Path to tenant's SQLite database
  settings: TenantSettings;
}

export interface TenantSettings {
  hrworksApiKey?: string;
  hrworksApiSecret?: string;
  webhookSecret?: string;
  syncEnabled: boolean;
  lastSyncAt?: Date;
}

export interface AuthTokenPayload {
  sub: ULID; // User ID
  tenantId: ULID;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: Omit<User, 'tenantId'>;
}
