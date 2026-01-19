import { z } from 'zod';

export const userRoleSchema = z.enum(['admin', 'editor', 'viewer']);

export const loginRequestSchema = z.object({
  code: z.string().min(1), // OAuth2 authorization code
  redirectUri: z.string().url(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: userRoleSchema.optional().default('viewer'),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: userRoleSchema.optional(),
  isActive: z.boolean().optional(),
});

export const tenantSettingsSchema = z.object({
  hrworksApiKey: z.string().optional(),
  hrworksApiSecret: z.string().optional(),
  webhookSecret: z.string().optional(),
  syncEnabled: z.boolean().default(true),
  lastSyncAt: z.date().optional(),
});

export type LoginRequestInput = z.infer<typeof loginRequestSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type TenantSettingsInput = z.infer<typeof tenantSettingsSchema>;
