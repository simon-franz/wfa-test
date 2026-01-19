import type { FloatDirection } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type ProfileMenuProps = {
  trigger: ReactNode;
  title?: string;
  subtitle?: string;
  placement?: FloatDirection;
  portrait?: ReactNode;
  headerChildren?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
