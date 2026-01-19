import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type FormBackendProps = {
  componentChildren: SmartFaceComponentsType[];
  fullHeight?: boolean;
};

export type FormBackendDefinition = SmartFaceBackendComponent<'Form', FormBackendProps>;

export type FormAdapterProps = SmartFaceAdapterPropsType<FormBackendDefinition>;
