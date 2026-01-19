import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type OnboardingWelcomePageBackendProps = {
  heading?: string;
  bodyChildren?: SmartFaceComponentsType[];
  footerChildren?: SmartFaceComponentsType[];
};

export type OnboardingWelcomePageBackendDefinition = SmartFaceBackendComponent<
  'OnboardingWelcomePage',
  OnboardingWelcomePageBackendProps
>;

export type OnboardingWelcomePageAdapterProps = SmartFaceAdapterPropsType<OnboardingWelcomePageBackendDefinition>;
