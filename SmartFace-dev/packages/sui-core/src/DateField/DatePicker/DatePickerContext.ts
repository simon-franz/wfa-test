import type { Size } from '@hrworks/types/shared/UiTypes';
import { createContext } from 'react';

import type { PickerType } from './DatePicker';

type DatePickerContextType = {
  today: Date;
  cycleSelectMode: (backwards?: boolean) => void;
  selectMode?: PickerType;
  size: Size;
};

export const DatePickerContext = createContext<DatePickerContextType>({} as DatePickerContextType);
