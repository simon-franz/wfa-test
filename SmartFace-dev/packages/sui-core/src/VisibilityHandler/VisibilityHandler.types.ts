import type { Visibility } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type VisibilityHandlerProps = {
  visible?: Visibility;
} & HTMLAttributes<HTMLDivElement>;
