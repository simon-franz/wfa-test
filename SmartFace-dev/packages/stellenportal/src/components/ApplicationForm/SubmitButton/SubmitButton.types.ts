import type { ButtonProps } from '@hrworks/sui-core/Button/Button.types';

export type SubmitButtonProps = Omit<ButtonProps, 'disabled' | 'type'>;
