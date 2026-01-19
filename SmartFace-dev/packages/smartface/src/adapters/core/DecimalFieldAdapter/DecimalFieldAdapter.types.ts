import type { NumberInputFieldBackendProps } from '../../../types/shared/NumberInputFieldBackendProps';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type DecimalFieldBackendProps = NumberInputFieldBackendProps;

export type DecimalFieldBackendDefinition = SmartFaceBackendComponent<'DecimalField', DecimalFieldBackendProps>;

export type DecimalFieldAdapterProps = SmartFaceAdapterPropsType<DecimalFieldBackendDefinition>;
