import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type PanelGroupItemBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  threshold?: Size;
  size?: number;
};

export type PanelGroupItemBackendDefinition = SmartFaceBackendComponentPart<PanelGroupItemBackendProps, 'Item'>;

export type PanelGroupItemAdapterProps = SmartFaceAdapterPropsType<PanelGroupItemBackendDefinition>;
