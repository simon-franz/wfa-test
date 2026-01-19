import type { ChangeEvent, FormHTMLAttributes } from 'react';

export type LoginFormProps = FormHTMLAttributes<HTMLFormElement>;

export type CheckboxChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;
