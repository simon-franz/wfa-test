import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

type Intensity = 'off' | 'low' | 'medium' | 'high';

export type LoadingOverlayBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  loading: boolean;
  type?: 'spinner';
  blurIntensity?: Intensity;
  fadeIntensity?: Intensity;
};
export type LoadingOverlayBackendDefinition = SmartFaceBackendComponent<'LoadingOverlay', LoadingOverlayBackendProps>;

export type LoadingOverlayAdapterProps = SmartFaceAdapterPropsType<LoadingOverlayBackendDefinition>;
