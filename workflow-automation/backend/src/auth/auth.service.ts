import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import { users } from 'shared/db';
import { ulid } from 'shared/utils';
import type { AuthTokenPayload, LoginResponse, User } from 'shared/types';
import { LandlordService } from '../db/landlord.service';
import { TenantManager } from '../db/tenant-manager';

interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
}

interface OAuthUserInfo {
  sub: string; // User ID
  email: string;
  given_name: string;
  family_name: string;
  org_id: string;
  org_name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private landlordService: LandlordService,
    private tenantManager: TenantManager,
  ) {}

  async exchangeCodeForToken(code: string, redirectUri: string): Promise<OAuthTokenResponse> {
    const clientId = this.configService.get<string>('HRWORKS_OAUTH_CLIENT_ID');
    const clientSecret = this.configService.get<string>('HRWORKS_OAUTH_CLIENT_SECRET');
    const apiBaseUrl = this.configService.get<string>('HRWORKS_API_BASE_URL') || 'https://api.hrworks.de';

    const response = await fetch(`${apiBaseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId || '',
        client_secret: clientSecret || '',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new UnauthorizedException(`OAuth token exchange failed: ${error}`);
    }

    return response.json() as Promise<OAuthTokenResponse>;
  }

  async getUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    const apiBaseUrl = this.configService.get<string>('HRWORKS_API_BASE_URL') || 'https://api.hrworks.de';

    const response = await fetch(`${apiBaseUrl}/oauth/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new UnauthorizedException('Failed to get user info');
    }

    return response.json() as Promise<OAuthUserInfo>;
  }

  async loginWithOAuth(code: string, redirectUri: string): Promise<LoginResponse> {
    // Exchange code for token
    const tokens = await this.exchangeCodeForToken(code, redirectUri);

    // Get user info from HR WORKS
    const userInfo = await this.getUserInfo(tokens.access_token);

    // Find or create tenant
    let tenant = await this.landlordService.findTenantByHrworksOrgId(userInfo.org_id);
    if (!tenant) {
      tenant = await this.landlordService.createTenant({
        hrworksOrgId: userInfo.org_id,
        name: userInfo.org_name,
        dbPath: `dev-tenants/${userInfo.org_id}.db`,
        isActive: true,
        settings: {
          syncEnabled: true,
        },
      });
    }

    // Get tenant database
    const tenantDb = await this.tenantManager.getConnection(tenant.id);

    // Find or create user
    let user = tenantDb
      .select()
      .from(users)
      .where(eq(users.hrworksPersonId, userInfo.sub))
      .get();

    const now = new Date();

    if (!user) {
      const newUserId = ulid();
      tenantDb
        .insert(users)
        .values({
          id: newUserId,
          hrworksPersonId: userInfo.sub,
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          role: 'admin', // First user is admin
          isActive: true,
          lastLoginAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .run();

      user = tenantDb.select().from(users).where(eq(users.id, newUserId)).get();
    } else {
      // Update last login
      tenantDb
        .update(users)
        .set({ lastLoginAt: now, updatedAt: now })
        .where(eq(users.id, user.id))
        .run();
    }

    if (!user) {
      throw new Error('Failed to create or find user');
    }

    // Generate JWT
    const payload: Omit<AuthTokenPayload, 'iat' | 'exp'> = {
      sub: user.id,
      tenantId: tenant.id,
      email: user.email,
      role: user.role as 'admin' | 'editor' | 'viewer',
    };

    const accessToken = this.jwtService.sign(payload);
    const decodedToken = this.jwtService.decode(accessToken) as AuthTokenPayload;

    return {
      accessToken,
      expiresIn: decodedToken.exp - decodedToken.iat,
      user: {
        id: user.id,
        hrworksPersonId: user.hrworksPersonId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as 'admin' | 'editor' | 'viewer',
        isActive: Boolean(user.isActive),
        lastLoginAt: user.lastLoginAt ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async validateToken(payload: AuthTokenPayload): Promise<User | null> {
    try {
      const tenant = await this.landlordService.findTenantById(payload.tenantId);
      if (!tenant || !tenant.isActive) {
        return null;
      }

      const tenantDb = await this.tenantManager.getConnection(payload.tenantId);
      const user = tenantDb.select().from(users).where(eq(users.id, payload.sub)).get();

      if (!user || !user.isActive) {
        return null;
      }

      return {
        id: user.id,
        tenantId: payload.tenantId,
        hrworksPersonId: user.hrworksPersonId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as 'admin' | 'editor' | 'viewer',
        isActive: Boolean(user.isActive),
        lastLoginAt: user.lastLoginAt ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch {
      return null;
    }
  }

  getOAuthAuthorizationUrl(redirectUri: string, state: string): string {
    const clientId = this.configService.get<string>('HRWORKS_OAUTH_CLIENT_ID');
    const apiBaseUrl = this.configService.get<string>('HRWORKS_API_BASE_URL') || 'https://api.hrworks.de';

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId || '',
      redirect_uri: redirectUri,
      scope: 'openid profile email',
      state,
    });

    return `${apiBaseUrl}/oauth/authorize?${params}`;
  }

  /**
   * Dev-only login for local development without OAuth
   */
  async loginDev(): Promise<LoginResponse> {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    if (nodeEnv !== 'development') {
      throw new UnauthorizedException('Dev login is only available in development mode');
    }

    const devOrgId = 'dev-org-001';

    // Find or create dev tenant
    let tenant = await this.landlordService.findTenantByHrworksOrgId(devOrgId);
    if (!tenant) {
      tenant = await this.landlordService.createTenant({
        hrworksOrgId: devOrgId,
        name: 'Development Tenant',
        dbPath: `dev-tenants/${devOrgId}.db`,
        isActive: true,
        settings: {
          syncEnabled: false,
        },
      });
    }

    // Get tenant database
    const tenantDb = await this.tenantManager.getConnection(tenant.id);

    const devPersonId = 'dev-admin-001';
    const now = new Date();

    // Find or create dev admin user
    let user = tenantDb
      .select()
      .from(users)
      .where(eq(users.hrworksPersonId, devPersonId))
      .get();

    if (!user) {
      const newUserId = ulid();
      tenantDb
        .insert(users)
        .values({
          id: newUserId,
          hrworksPersonId: devPersonId,
          email: 'admin@localhost',
          firstName: 'Dev',
          lastName: 'Admin',
          role: 'admin',
          isActive: true,
          lastLoginAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .run();

      user = tenantDb.select().from(users).where(eq(users.id, newUserId)).get();
    } else {
      // Update last login
      tenantDb
        .update(users)
        .set({ lastLoginAt: now, updatedAt: now })
        .where(eq(users.id, user.id))
        .run();
    }

    if (!user) {
      throw new Error('Failed to create dev user');
    }

    // Generate JWT
    const payload: Omit<AuthTokenPayload, 'iat' | 'exp'> = {
      sub: user.id,
      tenantId: tenant.id,
      email: user.email,
      role: user.role as 'admin' | 'editor' | 'viewer',
    };

    const accessToken = this.jwtService.sign(payload);
    const decodedToken = this.jwtService.decode(accessToken) as AuthTokenPayload;

    return {
      accessToken,
      expiresIn: decodedToken.exp - decodedToken.iat,
      user: {
        id: user.id,
        hrworksPersonId: user.hrworksPersonId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as 'admin' | 'editor' | 'viewer',
        isActive: Boolean(user.isActive),
        lastLoginAt: user.lastLoginAt ?? undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  isDevMode(): boolean {
    return this.configService.get<string>('DEV_MODE') === 'true' || 
           this.configService.get<string>('NODE_ENV') === 'development';
  }
}
