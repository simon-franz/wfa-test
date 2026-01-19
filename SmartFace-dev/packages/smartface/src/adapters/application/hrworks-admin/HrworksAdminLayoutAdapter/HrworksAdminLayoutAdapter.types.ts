import type { LogoBackendProps } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';
import type { NavItemBackendProps } from './NavItem/NavItemAdapter.types';

export type HrworksAdminLayoutBackendProps = {
  activeNavigationItemSfId?: string;
  header?: {
    logo?: LogoBackendProps;
    navigationItems?: NavItemBackendProps[];
    componentChildren?: SmartFaceComponentsType[];
  };
  contentHeaderChildren?: SmartFaceComponentsType[];
  contentChildren?: SmartFaceComponentsType[];
};

export type HrworksAdminLayoutBackendDefinition = SmartFaceBackendComponent<
  'HrworksAdminLayout',
  HrworksAdminLayoutBackendProps
>;

export type HrworksAdminLayoutAdapterProps = SmartFaceAdapterPropsType<HrworksAdminLayoutBackendDefinition>;
