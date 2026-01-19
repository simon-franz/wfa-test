import type { FloatDirection } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type TooltipProps = {
  placement?: FloatDirection;
  fullWidth?: boolean;
  title?: string;
  text?: string;
  html?: boolean;
  trigger?: 'hoverOrTouch' | 'longHover' | 'longHoverOrLongTouch';
  mainAxisOffset?: number;
  htmlTag?: keyof HTMLElementTagNameMap;
  customTooltip?: ReactNode;
  unstyledTrigger?: boolean;
} & HTMLAttributes<HTMLElement>;
