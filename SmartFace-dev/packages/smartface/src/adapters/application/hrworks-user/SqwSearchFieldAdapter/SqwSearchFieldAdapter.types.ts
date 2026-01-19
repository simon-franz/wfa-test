import type { InputBackendProps } from '../../../../types/shared/InputFieldBackendProps';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../../types/SmartFaceComponent';

export type SqwSearchFieldBackendProps = InputBackendProps;

export type SqwSearchFieldBackendDefinition = SmartFaceBackendComponent<'SqwSearchField', SqwSearchFieldBackendProps>;

export type SqwSearchFieldAdapterProps = SmartFaceAdapterPropsType<SqwSearchFieldBackendDefinition>;
