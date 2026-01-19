import type { FormComponentProps, JustifyContent } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type FormGroupProps = {
  justifyContent?: Exclude<JustifyContent, 'space-around' | 'space-evenly'>;
  element?: 'label' | 'div';
  labelChildren?: ReactNode;
} & HTMLAttributes<HTMLDivElement> &
  Partial<FormComponentProps>;
