import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../../types/SmartFaceComponentsType';

export type SqwSupportMenuBackendProps = {
  title?: string;
  subtitle?: string;
  componentChildren?: SmartFaceComponentsType[];
};

export type SqwSupportMenuBackendDefinition = SmartFaceBackendComponent<'SqwSupportMenu', SqwSupportMenuBackendProps>;

export type SqwSupportMenuAdapterProps = SmartFaceAdapterPropsType<SqwSupportMenuBackendDefinition>;
