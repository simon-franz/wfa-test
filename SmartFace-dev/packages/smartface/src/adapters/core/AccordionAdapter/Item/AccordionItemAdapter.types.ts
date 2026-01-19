import type { Color } from '@hrworks/types/shared/UiTypes';

import type { IconBackendDefinition } from '../../../../types/shared/BackendTypes';
import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type AccordionItemBackendProps = {
  title: string;
  componentChildren: SmartFaceComponentsType[];
  icon?: IconBackendDefinition;
  preventInitialExpand?: boolean;
  preventExpand?: boolean;
  onBeforeInitialExpand?: SfEventType;
  onBeforeExpand?: SfEventType;
  onAfterInitialExpand?: SfEventType;
  onAfterExpand?: SfEventType;
  onCollapse?: SfEventType;
  color?: Color;
};

export type AccordionItemBackendDefinition = SmartFaceBackendComponentPart<AccordionItemBackendProps>;

export type AccordionItemAdapterProps = SmartFaceAdapterPropsType<AccordionItemBackendDefinition>;
