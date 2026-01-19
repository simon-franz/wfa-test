import type { FloatDirection } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type SqwMenuProps = {
  placement?: FloatDirection;
  portrait?: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  onPortraitAction?: () => void;
} & HTMLAttributes<HTMLDivElement>;
