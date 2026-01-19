import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type HelpTextProps = Pick<FormComponentProps, 'helpText' | 'validationMessage' | 'validationState' | 'size'> &
  HTMLAttributes<HTMLSpanElement>;
