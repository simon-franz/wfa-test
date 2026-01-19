import type { ImageBackendDefinition } from '../../../adapters/core/ImageAdapter/ImageAdapter.types';
import type { AfterEffectsMediaBackendDefinition } from '../../../adapters/extension/AfterEffectsMediaAdapter/AfterEffectsMediaAdapter.types';
import type { IconBackendDefinition } from '../../../types/shared/BackendTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type ServerStatusBackendProps = {
  statusCode?: string;
  title?: string;
  subtitle?: string;
  media?: ImageBackendDefinition | AfterEffectsMediaBackendDefinition | IconBackendDefinition;
};
export type ServerStatusBackendDefinition = SmartFaceBackendComponent<'ServerStatus', ServerStatusBackendProps>;

export type ServerStatusAdapterProps = SmartFaceAdapterPropsType<ServerStatusBackendDefinition>;
