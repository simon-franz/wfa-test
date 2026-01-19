import type { Visibility } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type VisibilityHandlerBackendProps = {
  visible?: Visibility;
  componentChildren?: SmartFaceComponentsType[];
};

export type VisibilityHandlerBackendDefinition = SmartFaceBackendComponent<
  'VisibilityHandler',
  VisibilityHandlerBackendProps
>;

export type VisibilityHandlerAdapterProps = SmartFaceAdapterPropsType<VisibilityHandlerBackendDefinition>;
