import { createContext, type CSSProperties, type Dispatch, type RefObject, type SetStateAction } from 'react';

type DropdownContextProps = {
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  arrowRef: RefObject<HTMLDivElement | null>;
  arrowStyles: CSSProperties;
  floatingStyles: CSSProperties;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const DropdownContext = createContext<DropdownContextProps>({} as DropdownContextProps);
