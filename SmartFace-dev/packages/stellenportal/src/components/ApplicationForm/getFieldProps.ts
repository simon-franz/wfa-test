import type { FormFieldKeys, TFormFieldFunction } from './ApplicationForm.types';

type FormState = {
  inputs?: Record<string, string | undefined>;
  errors?: Record<string, string[]>;
};

export const getFieldProps = (formState: FormState, key: FormFieldKeys, t: TFormFieldFunction, name?: string) => {
  const label = t(`${key}`);

  return {
    name: name || key,
    label,
    placeholder: label,
    'aria-label': label,
    defaultValue: formState.inputs?.[key],
    validationMessage: formState.errors?.[key]?.[0],
    validationState: formState.errors?.[key]?.[0] ? ('danger' as const) : undefined,
  };
};
