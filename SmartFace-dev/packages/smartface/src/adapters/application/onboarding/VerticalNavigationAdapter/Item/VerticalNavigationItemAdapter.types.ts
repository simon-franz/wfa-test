import type { IconBackendDefinition } from '../../../../../types/shared/BackendTypes';
import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../../types/SmartFaceComponentsType';

type ArrowBar = {
  description?: string;
  icon?: IconBackendDefinition;
  onClick?: SfEventType;
  show?: boolean;
};

export type VerticalNavigationItemBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  hasError?: boolean;
  navigationTitle?: string;
  topArrowBar?: ArrowBar;
  bottomArrowBar?: ArrowBar;
  navigationIcon?: IconBackendDefinition;
};

export type VerticalNavigationItemBackendDefinition = SmartFaceBackendComponentPart<VerticalNavigationItemBackendProps>;
