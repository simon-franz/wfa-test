import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type LabelProps = Pick<Partial<FormComponentProps>, 'label' | 'validationState' | 'mandatory'> &
  HTMLAttributes<HTMLDivElement>;
