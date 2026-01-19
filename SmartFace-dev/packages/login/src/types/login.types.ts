// Normal Login
export type User = {
  companyId: string;
  userId: string;
};

export type LoginCredentials = User & {
  password: string;
};

export type AuthenticationClientRequest = LoginCredentials;

export type AuthenticationClientResponse = Partial<User> & {
  success: boolean;
  errorMessage?: string;
  redirectUrl?: string;
  twoFactor?: TwoFactor;
};

// 2FA
type TwoFactor = {
  selection?: boolean;
  methods?: TwoFactorMethods;
  defaultMethod?: keyof TwoFactorMethods;
};

export type TwoFactorSelectionQueryParams = {
  available: boolean;
  createdAt: string | null;
  lastUsedAt: string | null;
};

export type TwoFactorMethod = {
  available: boolean;
  email?: string;
  createdAt: string | null;
  lastUsedAt: string | null;
};

export type TwoFactorMethods = {
  authenticator: TwoFactorMethod;
  yubikey: TwoFactorMethod;
  email: TwoFactorMethod;
};

export type VerificationCode = {
  hashedCode: string;
  salt: string;
  createdAt: string;
  attempts: number;
};

export type VerifyTwoFactorRequest = Partial<User> & {
  verificationCode: string;
};

export type VerifyTwoFactorResponse = {
  success: boolean;
};

export type SendTwoFactorResponse = {
  success: boolean;
  errorMessage?: string;
  expiresIn?: number;
};
