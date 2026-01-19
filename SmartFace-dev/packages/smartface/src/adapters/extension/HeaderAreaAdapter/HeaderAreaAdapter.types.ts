import type { Size } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type HeaderAreaBackendProps = {
  title?: string;
  subtitle?: string;
  titleChildren?: SmartFaceComponentsType[];
  subtitleChildren?: SmartFaceComponentsType[];
  toolbarChildren?: SmartFaceComponentsType[];
  flexToolbarChildren?: SmartFaceComponentsType[];
  titleSize?: Size;
  subtitleSize?: Size;
  componentChildren?: SmartFaceComponentsType[];
  fullHeight?: boolean;
};

export type HeaderAreaBackendDefinition = SmartFaceBackendComponent<'HeaderArea', HeaderAreaBackendProps>;

export type HeaderAreaAdapterProps = SmartFaceAdapterPropsType<HeaderAreaBackendDefinition>;
