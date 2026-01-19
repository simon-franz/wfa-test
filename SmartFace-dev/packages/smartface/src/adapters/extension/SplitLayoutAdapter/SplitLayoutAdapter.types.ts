import type { LogoBackendProps } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type SplitLayoutBackendProps = {
  sidebarChildren?: SmartFaceComponentsType[];
  componentChildren?: SmartFaceComponentsType[];
  expandSidebar?: boolean;
  logo?: LogoBackendProps;
};

export type SplitLayoutBackendDefinition = SmartFaceBackendComponent<'SplitLayout', SplitLayoutBackendProps>;

export type SplitLayoutAdapterProps = SmartFaceAdapterPropsType<SplitLayoutBackendDefinition>;
