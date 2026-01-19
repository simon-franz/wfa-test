export type TwoFactorMethod = 'email' | 'authenticator' | 'yubiKey';

export type TwoFactorSelectionState = {
  isLoading: boolean;
  error: string | null;
};
