import type { Size } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type PanelGroupItemProps = Omit<HTMLAttributes<HTMLElement>, 'onResize'> & {
  threshold?: Size;
  size?: number;
  order?: number;
  onResize?: (size: number) => void;
};
