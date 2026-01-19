import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type FormTextProps = {
  value: string;
  html?: boolean;
  labelChildren?: ReactNode;
  alignItems?: 'start' | 'center' | 'end';
} & Pick<FormComponentProps, 'label' | 'size'> &
  HTMLAttributes<HTMLDivElement>;
