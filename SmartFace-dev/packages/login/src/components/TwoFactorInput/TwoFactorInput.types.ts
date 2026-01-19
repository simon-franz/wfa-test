export type TwoFactorInputProps = {
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  clearInput?: boolean;
  onClearComplete?: () => void;
  autoFocus?: boolean;
};
