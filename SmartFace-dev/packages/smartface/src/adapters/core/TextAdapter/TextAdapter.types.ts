import type { Color, OnClickLinkProps, ResponsiveAttribute, Size, TextAlign } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type TextBackendProps = OnClickLinkProps & {
  text: string;
  variant?: 'default' | 'subtle';
  hover?: boolean;
  html?: boolean;
  fullWidth?: boolean;
  color?: Color;
  fontSize?: Size;
  fontWeight?: 'thin' | 'normal' | 'bold';
  underlined?: boolean;
  italic?: boolean;
  textAlign?: ResponsiveAttribute<TextAlign>;
};

export type TextBackendDefinition = SmartFaceBackendComponent<'Text', TextBackendProps>;

export type TextAdapterProps = SmartFaceAdapterPropsType<TextBackendDefinition>;
