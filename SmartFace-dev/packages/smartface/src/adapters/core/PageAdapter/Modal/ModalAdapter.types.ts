import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

type ModalAnimationDirections = 'top' | 'left' | 'right' | 'bottom' | 'grow' | 'shrink';

export type ModalBackendProps = {
  childModal?: ModalBackendDefinition;
  bodyChildren?: SmartFaceComponentsType[];
  footerChildren?: SmartFaceComponentsType[];
  onBeforeClose?: SfEventType;
  onAfterClose?: SfEventType;
  title?: string;
  size?: Size | 'auto';
  closeable?: boolean;
  preventClose?: boolean;
  entryAnimation?: ModalAnimationDirections;
  exitAnimation?: ModalAnimationDirections;
  fullHeight?: boolean;
  fullWidth?: boolean;
  fullScreen?: boolean;
};

export type ModalBackendDefinition = SmartFaceBackendComponentPart<ModalBackendProps>;

export type ModalAdapterProps = SmartFaceAdapterPropsType<ModalBackendDefinition>;
