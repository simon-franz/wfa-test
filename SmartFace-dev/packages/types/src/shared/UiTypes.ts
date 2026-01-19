import type { HTMLAttributeAnchorTarget } from 'react';
import type { RequireAtLeastOne } from 'type-fest';

import type { screenSizes } from '@hrworks/design-system/mediaQueries.ts';

export const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'] as const;
export type Size = (typeof sizes)[number];

export const directions = ['horizontal', 'vertical'] as const;
export type Direction = (typeof directions)[number];

export const corners = ['pill', 'rounded', 'square'] as const;
export type Corner = (typeof corners)[number];

export const textAligns = ['start', 'center', 'end', 'justify'] as const;
export type TextAlign = (typeof textAligns)[number];

export const alignTitles = ['start', 'center', 'end'] as const;
export type AlignTitle = (typeof alignTitles)[number];

export const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
export type Color = (typeof colors)[number];

export const gaps = [...sizes, 'none', 'default'] as const;
export type Gap = (typeof gaps)[number];

export type HexColor = `#${string}`;

export const presentations = ['dropdown', 'modal'] as const;
export type Presentation = (typeof presentations)[number];

export const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
export type JustifyContent = (typeof justifyContents)[number];

export const floatDirections = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
] as const;

export type FloatDirection = (typeof floatDirections)[number];

export type OnClickLinkProps = { href?: string; target?: HTMLAttributeAnchorTarget };

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof breakpoints)[number];

export type ResponsiveAttribute<Attribute> = Attribute | Partial<Record<Breakpoint, Attribute>>;

export const separators = ['arrow', 'slash'] as const;
export type Separator = (typeof separators)[number];

export const validationStates = ['success', 'warning', 'danger'] as const;
export type FormComponentBaseProps = {
  name: string;
  disabled?: boolean;
  helpText?: string;
  mandatory?: boolean;
  size?: Size;
  validationMessage?: string;
  validationState?: (typeof validationStates)[number];
};

export type FormComponentDescriptionProps = {
  label?: string;
  'aria-label'?: string;
};

export type FormComponentProps = FormComponentBaseProps & RequireAtLeastOne<FormComponentDescriptionProps>;

export type InputDescriptionProps = FormComponentDescriptionProps & { placeholder?: string };

export type InputProps<T = string> = {
  value?: T;
  readOnly?: boolean;
  spellCheck?: boolean;
  defaultValue?: T;
} & FormComponentBaseProps &
  RequireAtLeastOne<InputDescriptionProps>;

export type NumberInputProps = InputProps & {
  thousandsSeparator?: string;
  min?: number;
  max?: number;
  signed?: boolean;
};

export type Validation = {
  text: string;
  hasError: (value?: string) => boolean;
  focused?: boolean;
};

export type FloatingValidation = Pick<Validation, 'text' | 'hasError'>;

export const dateFormats = ['DDMMYYYY', 'MMDDYYYY'] as const;
export type DateFormat = (typeof dateFormats)[number];

export type IsoDateRange = { from: string; to: string };

export const treeNodeVariants = ['default', 'greyedOut', 'highlighted'] as const;
export type TreeNodeVariant = (typeof treeNodeVariants)[number];

export type Visibility = BreakpointWidth | BreakpointWidth[] | BreakpointWidthRange | boolean;

export type BreakpointWidth = keyof typeof screenSizes;

export type BreakpointWidthRange = `<=${BreakpointWidth}` | `>=${BreakpointWidth}`;

export const iconSets = ['font-awesome', 'streamline', 'font-awesome-svg', 'material-design'] as const;
export type IconSet = (typeof iconSets)[number];

export const overflowBehaviours = ['ellipsis', 'break'] as const;
export type OverflowBehaviour = (typeof overflowBehaviours)[number];
