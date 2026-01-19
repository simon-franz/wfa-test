import type { Color, OnClickLinkProps } from '@hrworks/types/shared/UiTypes';

import type { SfEventType } from '../../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponentPart } from '../../../../../types/SmartFaceComponent';

export type TabBackendProps = {
  title: string;
  preventInitialSelect?: boolean;
  preventSelect?: boolean;
  onBeforeInitialSelect?: SfEventType;
  onBeforeSelect?: SfEventType;
  onAfterInitialSelect?: SfEventType;
  onAfterSelect?: SfEventType;
  onDeselect?: SfEventType;
  color?: Color;
} & OnClickLinkProps;

type TabBackendDefinition = SmartFaceBackendComponentPart<TabBackendProps>;

export type TabAdapterProps = SmartFaceAdapterPropsType<TabBackendDefinition>;
