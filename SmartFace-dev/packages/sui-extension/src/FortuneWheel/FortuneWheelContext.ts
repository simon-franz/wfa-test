import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { ChosenItemProps } from './FortuneWheel';

export type FortuneWheelContextProps = {
  currentSize: number;
  segMidAngle: number;
  strokeColor: string;
  fillColors: string[];
  textColors: string[];
  chosenItemProps: ChosenItemProps;
  setChosenItemProps: Dispatch<SetStateAction<ChosenItemProps>>;
};

export const FortuneWheelContextProps = createContext<FortuneWheelContextProps>({} as FortuneWheelContextProps);
