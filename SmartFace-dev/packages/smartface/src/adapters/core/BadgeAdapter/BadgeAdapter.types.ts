import type { Color, Corner, Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type BadgeBackendProps = {
  anchor?: SmartFaceComponentsType;
  variant?: 'filled' | 'outlined';
  text?: string;
  corner?: Corner;
  size?: Size;
  dot?: boolean;
  color?: Color;
  fullWidth?: boolean;
  fixedSize?: boolean;
  animation?: 'none' | 'pulsing' | 'breathing' | 'flashing' | 'jumping';
};

export type BadgeBackendDefinition = SmartFaceBackendComponent<'Badge', BadgeBackendProps>;

export type BadgeAdapterProps = SmartFaceAdapterPropsType<BadgeBackendDefinition>;
