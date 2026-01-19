import { defaultCheckboxGroup } from '../CheckboxGroup/CheckboxGroupDefaultProps';
import type { FormBackendProps } from '@hrworks/smartface/adapters/core/FormAdapter/FormAdapter.types';

export const formDefaultProps: FormBackendProps = {
  componentChildren: [defaultCheckboxGroup()],
  fullHeight: true,
};
