import type { FloatDirection } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type TooltipBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  placement?: FloatDirection;
  fullWidth?: boolean;
  title?: string;
  text?: string;
  trigger?: 'hoverOrTouch' | 'longHover' | 'longHoverOrLongTouch';
};
export type TooltipBackendDefinition = SmartFaceBackendComponent<'Tooltip', TooltipBackendProps>;

export type TooltipAdapterProps = SmartFaceAdapterPropsType<TooltipBackendDefinition>;
