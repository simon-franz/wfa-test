import type { Color, OnClickLinkProps } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type TabProps = {
  preventInitialSelect?: boolean;
  preventSelect?: boolean;
  onBeforeInitialSelect?: () => Promise<unknown>;
  onBeforeSelect?: () => Promise<unknown>;
  onAfterInitialSelect?: () => void;
  onAfterSelect?: () => void;
  onDeselect?: () => void;
  color?: Color;
} & OnClickLinkProps &
  HTMLAttributes<HTMLElement>;
