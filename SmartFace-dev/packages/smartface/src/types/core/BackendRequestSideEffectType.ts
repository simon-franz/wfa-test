import type { SfEventType } from '../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../types/SmartFaceComponent';

type BackendRequestSideEffectPropsType = {
  onLoad: SfEventType;
};

export type BackendRequestSideEffectBackendType = SmartFaceBackendComponent<
  'BackendRequest',
  BackendRequestSideEffectPropsType
>;

export type BackendRequestSideEffectAdapterPropsType = SmartFaceAdapterPropsType<BackendRequestSideEffectBackendType>;
