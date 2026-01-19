import type { LogoBackendProps } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type BlankLayoutBackendProps = {
  componentChildren?: SmartFaceComponentsType[];
  logo?: LogoBackendProps;
  borderless?: boolean;
};

export type BlankLayoutBackendDefinition = SmartFaceBackendComponent<'BlankLayout', BlankLayoutBackendProps>;

export type BlankLayoutAdapterProps = SmartFaceAdapterPropsType<BlankLayoutBackendDefinition>;
