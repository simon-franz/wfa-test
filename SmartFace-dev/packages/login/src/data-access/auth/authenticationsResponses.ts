import type { AuthenticationClientResponse, TwoFactorMethods } from '../../types/login.types';

const sharedProps = {
  companyId: 'classware',
  password: 'Tester_123',
  redirectUrl: '/userPageDecoy',
} as const;

type ValidCredential = {
  companyId: string;
  userId: string;
  password: string;
  redirectUrl: string;
  response: AuthenticationClientResponse;
};

export const validCredentials: Record<string, ValidCredential> = {
  // Normal login (no 2FA)
  userNormal: {
    ...sharedProps,
    userId: 'normal',
    response: {
      success: true,
      redirectUrl: sharedProps.redirectUrl,
    },
  },

  // 2FA required with email only
  userEmail: {
    ...sharedProps,
    userId: 'email',
    response: {
      success: false,
      twoFactor: {
        selection: false,
        defaultMethod: 'email',
        methods: {
          email: {
            email: 'user@classware.com',
            available: true,
            createdAt: null,
            lastUsedAt: null,
          },
        } as TwoFactorMethods,
      },
    },
  },

  // 2FA required with multiple options
  userSelection: {
    ...sharedProps,
    userId: 'selection',
    response: {
      success: false,
      twoFactor: {
        selection: true,
        methods: {
          authenticator: {
            available: true,
            createdAt: '15.01.24 10:30',
            lastUsedAt: '22.03.24 14:45',
          },
          yubikey: {
            available: true,
            createdAt: '08.02.24 16:20',
            lastUsedAt: '20.03.24 09:15',
          },
          email: {
            email: 'user@classware.com',
            available: true,
            createdAt: null,
            lastUsedAt: null,
          },
        } as TwoFactorMethods,
      },
    },
  },
} as const;

type AuthenticationError = {
  errorCode: number;
  type: string;
  errorMessage: string;
};

export const authenticationErrors: Record<string, AuthenticationError> = {
  invalidFormat: {
    errorCode: 401,
    type: 'AuthenticationError',
    errorMessage: 'Invalid credentials format',
  },
  invalidCredentials: {
    errorCode: 401,
    type: 'AuthenticationError',
    errorMessage: 'Invalid credentials',
  },
} as const;

// SSO
export const ssoProvider = {
  companyA: {
    companyId: 'classware',
    response: {
      ssoProvider: 'google',
      ipredirectUrl: 'google.de/sso',
    },
  },
  response: 'mock-token-default',
};

export const ssoErrors = {
  missingCompanyId: {
    errorCode: 400,
    type: 'ValidationError',
    errorMessage: 'Company ID is required',
  },
};
