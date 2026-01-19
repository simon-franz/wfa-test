export type CookieOptions = {
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
};

export type CookieNameGenerators = {
  twoFactorAuth: (realm: string, companyId: string, personId: string) => string;
  rememberMe: (realm: string) => string;
  savedUserId: (realm: string) => string;
  savedCompanyId: (realm: string) => string;
  authToken: string;

  // TODO: Find out if this cookies types are necessary, delete if not
  // https://www.notion.so/Cookies-2403747a51194584bf5f398b8701de36#42636e8d365c4253a0597588d44ebd01
  // applicationServer: (realm: string, serverId: string, imageId: string) => string;
  // desktop: (realm: string, serverId: string, imageId: string) => string;
  // imageQualifier: (realm: string, serverId: string) => string;
  // sessionCreation: (realm: string) => string;
  // legacyLoginServer: () => string;
  // legacyLoginServer5: () => string;
};

export type CookieExpirationGenerators = {
  session: undefined;
  sixMonths: () => Date;
  fiveHundredTwentyWeeks: () => Date;
  eightHours: () => Date;
};

export type SetCookie = (name: string, value: string, options?: CookieOptions) => Promise<void>;

export type GetCookie = (name: string) => Promise<string | null>;

export type DeleteCookie = (name: string) => Promise<void>;

export type GetBooleanCookie = (name: string) => Promise<boolean>;

export type SetBooleanCookie = (name: string, value: boolean, options?: CookieOptions) => Promise<void>;

export type SetCookieClient = (name: string, value: string, options?: CookieOptions) => void;

export type GetCookieClient = (name: string) => string | null;

export type DeleteCookieClient = (name: string, options?: Partial<Pick<CookieOptions, 'path' | 'domain'>>) => void;

export type GetBooleanCookieClient = (name: string) => boolean;

export type SetBooleanCookieClient = (name: string, value: boolean, options?: CookieOptions) => void;
