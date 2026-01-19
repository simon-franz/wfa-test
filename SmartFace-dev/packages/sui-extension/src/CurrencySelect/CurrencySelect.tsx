import Select from '@hrworks/sui-core/Select';

import currencyData from './currencies.json';
import type { CurrencySelectProps } from './CurrencySelect.types';

export const CurrencySelect = ({ 'aria-label': ariaLabel, ...otherProps }: CurrencySelectProps) => {
  const currencyOptions = Object.entries(currencyData).map(([code, currency]) => ({
    value: code,
    label: `${currency.symbol} ${currency.name} (${code})`,
  }));

  return <Select aria-label={ariaLabel || 'Currency'} options={currencyOptions} {...otherProps} />;
};
