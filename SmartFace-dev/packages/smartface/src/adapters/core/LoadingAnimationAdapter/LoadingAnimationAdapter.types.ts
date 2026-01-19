import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type LoadingAnimationBackendProps = {
  type: 'spinner' | 'shimmer';
  count?: number;
};
export type LoadingAnimationBackendDefinition = SmartFaceBackendComponent<
  'LoadingAnimation',
  LoadingAnimationBackendProps
>;

export type LoadingAnimationAdapterProps = SmartFaceAdapterPropsType<LoadingAnimationBackendDefinition>;
