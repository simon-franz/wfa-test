import { createContext } from 'react';
import type { SetRequired } from 'type-fest';

import type { RadioGroupProps } from './RadioGroup.types';

export type RadioGroupContext = SetRequired<
  Pick<
    RadioGroupProps,
    'disabled' | 'size' | 'name' | 'value' | 'onValueChange' | 'optionsDirection' | 'validationState'
  >,
  'size'
>;

export const RadioGroupContext = createContext<RadioGroupContext>({} as RadioGroupContext);
