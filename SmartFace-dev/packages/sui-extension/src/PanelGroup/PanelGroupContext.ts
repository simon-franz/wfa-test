import type { Direction, Size } from '@hrworks/types/shared/UiTypes';
import { createContext, type Dispatch, type RefObject, type SetStateAction } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';

type PanelGroupContextProps = {
  fullHeight?: boolean;
  isDragging?: boolean;
  hasOnlyOnePanelGroupItem?: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  direction: Direction;
  defaultThreshold?: Size;
  growingPanelRef?: RefObject<ImperativePanelHandle | null>;
  setGrowingPanelRef: Dispatch<SetStateAction<RefObject<ImperativePanelHandle | null> | undefined>>;
  resizingPanelId: string;
  setResizingPanelId: Dispatch<SetStateAction<string>>;
  orderCounterRef?: RefObject<number>;
  growingPanelOrder: number;
  setGrowingPanelOrder: Dispatch<SetStateAction<number>>;
};

export const PanelGroupContext = createContext<PanelGroupContextProps>({} as PanelGroupContextProps);
