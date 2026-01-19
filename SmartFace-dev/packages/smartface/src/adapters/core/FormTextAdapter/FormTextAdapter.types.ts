import type { FormComponentProps } from '@hrworks/types/shared/UiTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';
import type { SmartFaceComponentsType } from '../../../types/SmartFaceComponentsType';

export type FormTextBackendProps = Pick<FormComponentProps, 'label' | 'size'> & {
  value: string;
  html?: boolean;
  labelChildren?: SmartFaceComponentsType[];
  alignItems?: 'start' | 'center' | 'end';
};

export type FormTextBackendDefinition = SmartFaceBackendComponent<'FormText', FormTextBackendProps>;

export type FormTextAdapterProps = SmartFaceAdapterPropsType<FormTextBackendDefinition>;
