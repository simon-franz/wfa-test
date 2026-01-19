import type { CookieExpirationGenerators, CookieNameGenerators } from './cookies.types';

export const CookieNames: CookieNameGenerators = {
  twoFactorAuth: (realm, companyId, personId) => `secondFactorAuthentication-${realm}-${companyId}-${personId}`,
  rememberMe: (realm) => `HRworksRememberMeSession-${realm}`,
  savedUserId: (realm) => `savedUserId-${realm}`,
  savedCompanyId: (realm) => `savedCompanyId-${realm}`,
  authToken: 'hrworks-auth-token',

  // TODO: Find out if this cookies are necessary, delete if not
  // https://www.notion.so/Cookies-2403747a51194584bf5f398b8701de36#42636e8d365c4253a0597588d44ebd01
  // sessionCreation: (realm) => `${realm}-hrworks_session_creation`,
  // applicationServer: (realm, serverId, imageId) => `HRworks-ApplicationServer-${realm}-${serverId}${imageId}`,
  // desktop: (realm, serverId, imageId) => `HRworks-Desktop-${realm}-${serverId}${imageId}`,
  // imageQualifier: (realm, serverId) => `${realm}-${serverId}-imageQualifier`,
  // legacyLoginServer: () => 'HrwMeLoginServerSession',
  // legacyLoginServer5: () => 'HrwMe5LoginServerSession',
} as const;

export const CookieExpirations: CookieExpirationGenerators = {
  session: undefined,
  sixMonths: () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);

    return date;
  },
  fiveHundredTwentyWeeks: () => {
    const date = new Date();
    date.setTime(date.getTime() + 520 * 7 * 24 * 60 * 60 * 1000); // in ms

    return date;
  },
  eightHours: () => {
    const date = new Date();
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000); // 8 hours in ms

    return date;
  },
} as const;
