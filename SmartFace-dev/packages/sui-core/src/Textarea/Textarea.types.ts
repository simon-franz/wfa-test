import type { Direction, InputProps } from '@hrworks/types/shared/UiTypes';
import type { RefObject, TextareaHTMLAttributes } from 'react';

export type TextareaProps = InputProps<string> & {
  resize?: Direction | 'both' | 'none';
  rows?: number;
  growsWithContent?: boolean;
  onValueChange?: (value: string) => void;
  onValueChangeFinished?: (value: string) => void;
  ref?: RefObject<HTMLTextAreaElement | null>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
