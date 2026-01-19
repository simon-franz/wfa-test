import type { IconBackendDefinition } from '../../../types/shared/BackendTypes';
import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type CardBackendProps = {
  title?: string;
  subtitle?: string;
  icon?: IconBackendDefinition;
  keepToolbarAlwaysOnTop?: boolean;
  fullHeight?: boolean;
  toolbarChildren?: SmartFaceComponentsType[];
  bodyChildren?: SmartFaceComponentsType[];
  footerChildren?: SmartFaceComponentsType[];
  onClick?: SfEventType;
};

export type CardBackendDefinition = SmartFaceBackendComponent<'Card', CardBackendProps>;

export type CardAdapterProps = SmartFaceAdapterPropsType<CardBackendDefinition>;
