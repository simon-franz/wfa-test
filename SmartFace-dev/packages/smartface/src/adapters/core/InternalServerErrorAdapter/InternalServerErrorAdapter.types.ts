import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type InternalServerErrorBackendProps = {
  title: string;
  message: string;
  url?: string;
  html?: boolean;
};

export type InternalServerErrorBackendDefinition = SmartFaceBackendComponent<
  'InternalServerError',
  InternalServerErrorBackendProps
>;
export type InternalServerErrorAdapterProps = SmartFaceAdapterPropsType<InternalServerErrorBackendDefinition>;
