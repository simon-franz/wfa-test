import type { NumberInputBackendProps } from '../../../types/shared/InputFieldBackendProps';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type IntegerFieldBackendProps = NumberInputBackendProps;

export type IntegerFieldBackendDefinition = SmartFaceBackendComponent<'IntegerField', IntegerFieldBackendProps>;

export type IntegerFieldAdapterProps = SmartFaceAdapterPropsType<IntegerFieldBackendDefinition>;
