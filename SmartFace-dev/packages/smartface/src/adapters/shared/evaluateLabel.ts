import { MISSING_STRING } from '@hrworks/sui-shared';

type Params = {
  label?: string;
  placeholder?: string;
  ariaLabel?: string;
};

export const evaluateLabel = ({ label, placeholder, ariaLabel }: Params) =>
  label || (placeholder || ariaLabel ? '' : MISSING_STRING);
