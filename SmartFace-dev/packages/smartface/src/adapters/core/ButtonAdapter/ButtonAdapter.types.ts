import type { Color, Corner, Size, TextAlign } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition, OnClickLinkBackendProps } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type ButtonBackendProps = {
  color?: Color;
  text?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: IconBackendDefinition;
  rightIcon?: IconBackendDefinition;
  size?: Size;
  variant?: 'filled' | 'subtle' | 'ghost' | 'text' | 'link' | 'unstyled';
  corner?: Corner;
  textAlign?: TextAlign;
} & OnClickLinkBackendProps;

export type ButtonBackendDefinition = SmartFaceBackendComponent<'Button', ButtonBackendProps>;

export type ButtonAdapterProps = SmartFaceAdapterPropsType<ButtonBackendDefinition>;
