import type { Color, Corner } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../../types/shared/BackendTypes';
import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type AlertBackendProps = {
  closeable?: boolean;
  componentChildren?: SmartFaceComponentsType[];
  corner?: Exclude<Corner, 'pill'>;
  icon?: IconBackendDefinition;
  text?: string;
  title?: string;
  color?: Color;
  onClose?: SfEventType;
};

export type AlertBackendDefinition = SmartFaceBackendComponent<'Alert', AlertBackendProps>;

export type AlertAdapterProps = SmartFaceAdapterPropsType<AlertBackendDefinition>;
