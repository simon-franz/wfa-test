import type { HTMLAttributes } from 'react';

export type ButtonWithTooltipProps = {
  tooltipText: string;
} & HTMLAttributes<HTMLElement>;
