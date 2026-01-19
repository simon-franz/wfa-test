import NumberInputField from '../NumberInputField';
import type { DecimalFieldProps } from './DecimalField.types';

export const DecimalField = ({ radix = ',', ...otherProps }: DecimalFieldProps) => (
  <NumberInputField radix={radix} {...otherProps} />
);
