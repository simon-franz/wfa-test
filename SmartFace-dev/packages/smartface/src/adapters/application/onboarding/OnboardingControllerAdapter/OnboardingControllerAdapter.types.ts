import type { LogoBackendProps } from '../../../../types/shared/BackendTypes';
import type { SfEventType } from '../../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { OnboardingControllerItemBackendDefinition } from './Item/OnboardingControllerItemAdapter.types';

export type OnboardingControllerBackendProps = {
  activeItemSfId?: string;
  logo?: LogoBackendProps;
  onBeforeNavigation?: SfEventType;
  preventNavigation?: boolean;
  onAfterNavigation?: SfEventType;
  items?: OnboardingControllerItemBackendDefinition[];
  imprintUrl?: string;
};

export type OnboardingControllerBackendDefinition = SmartFaceBackendComponent<
  'OnboardingController',
  OnboardingControllerBackendProps
>;

export type OnboardingControllerAdapterProps = SmartFaceAdapterPropsType<OnboardingControllerBackendDefinition>;
