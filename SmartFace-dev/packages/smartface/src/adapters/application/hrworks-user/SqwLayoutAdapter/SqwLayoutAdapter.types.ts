import type { LogoBackendProps } from '../../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';
import type { SqwClockInButtonBackendDefinition } from '../SqwClockInButtonAdapter/SqwClockInButtonAdapter.types';
import type { SqwDropdownMenuBackendDefinition } from '../SqwDropdownMenuAdapter/SqwDropdownMenuAdapter.types';
import type { SqwProfileMenuBackendDefinition } from '../SqwProfileMenuAdapter/SqwProfileMenuAdapter.types';
import type { SqwSupportMenuBackendDefinition } from '../SqwSupportMenuAdapter/SqwSupportMenuAdapter.types';

export type SqwLayoutBackendProps = {
  contentChildren?: SmartFaceComponentsType[];
  header?: {
    logo?: LogoBackendProps;
    clockInButton?: SqwClockInButtonBackendDefinition;
    dropdowns?: SqwDropdownMenuBackendDefinition[];
    supportMenu?: SqwSupportMenuBackendDefinition;
    profileMenu?: SqwProfileMenuBackendDefinition;
  };
  sidebarChildren?: SmartFaceComponentsType[];
  borderless?: boolean;
};

export type SqwLayoutBackendDefinition = SmartFaceBackendComponent<'SqwLayout', SqwLayoutBackendProps>;

export type SqwLayoutAdapterProps = SmartFaceAdapterPropsType<SqwLayoutBackendDefinition>;
