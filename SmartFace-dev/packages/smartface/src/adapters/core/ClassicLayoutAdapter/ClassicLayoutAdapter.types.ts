import type { LogoBackendProps } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type ClassicLayoutBackendProps = {
  content: {
    componentChildren: SmartFaceComponentsType[];
    header?: {
      componentChildren: SmartFaceComponentsType[];
      fixed?: 'never';
    };
  };
  header?: {
    componentChildren?: SmartFaceComponentsType[];
    flexComponentChildren?: SmartFaceComponentsType[];
  };
  footer?: {
    componentChildren: SmartFaceComponentsType[];
  };
  sidebar?: {
    componentChildren: SmartFaceComponentsType[];
  };
  logo?: LogoBackendProps;
  desktopSidebarTogglerMode?: 'none' | 'fully-collapse';
};

export type ClassicLayoutBackendDefinition = SmartFaceBackendComponent<'ClassicLayout', ClassicLayoutBackendProps>;

export type ClassicLayoutAdapterProps = SmartFaceAdapterPropsType<ClassicLayoutBackendDefinition>;
