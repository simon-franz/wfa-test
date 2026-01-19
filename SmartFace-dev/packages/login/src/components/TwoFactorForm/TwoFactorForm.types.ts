import type { FormHTMLAttributes } from 'react';

export type TwoFactorFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'action'> & {
  formAction: (formData: FormData) => void;
  hiddenInputs?: Record<string, string>;
  serverError?: boolean;
};
