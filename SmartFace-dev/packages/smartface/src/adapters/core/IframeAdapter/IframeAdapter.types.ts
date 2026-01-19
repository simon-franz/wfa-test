import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type IframeBackendProps = {
  title?: string;
  src?: string;
  srcDoc?: string;
  fullHeight?: boolean;
};

export type IframeBackendDefinition = SmartFaceBackendComponent<'Iframe', IframeBackendProps>;

export type IframeAdapterProps = SmartFaceAdapterPropsType<IframeBackendDefinition>;
