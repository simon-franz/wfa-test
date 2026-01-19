import { createContext, type Dispatch, type SetStateAction } from 'react';

type PinPadContextProps = {
  setPinValue: Dispatch<SetStateAction<string>>;
  pinValue: string;
};

export const PinPadContext = createContext<PinPadContextProps>({} as PinPadContextProps);
