import NumberInputField from '../NumberInputField';
import type { IntegerFieldProps } from './IntegerField.types';

export const IntegerField = (props: IntegerFieldProps) => <NumberInputField scale={0} {...props} />;
