import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type DropzoneBackendProps = {
  alternativeComponentChildren: SmartFaceComponentsType[];
  componentChildren: SmartFaceComponentsType[];
  fileManagerSfId: string;
};

export type DropzoneBackendDefinition = SmartFaceBackendComponent<'Dropzone', DropzoneBackendProps>;

export type DropzoneAdapterProps = SmartFaceAdapterPropsType<DropzoneBackendDefinition>;
