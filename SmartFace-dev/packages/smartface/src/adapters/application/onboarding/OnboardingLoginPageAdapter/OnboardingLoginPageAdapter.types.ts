import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type OnboardingLoginPageBackendProps = {
  heading?: string;
  componentChildren?: SmartFaceComponentsType[];
};

export type OnboardingLoginPageBackendDefinition = SmartFaceBackendComponent<
  'OnboardingLoginPage',
  OnboardingLoginPageBackendProps
>;

export type OnboardingLoginPageAdapterProps = SmartFaceAdapterPropsType<OnboardingLoginPageBackendDefinition>;
