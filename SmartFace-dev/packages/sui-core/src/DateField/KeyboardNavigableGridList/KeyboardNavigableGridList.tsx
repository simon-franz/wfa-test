import { observer } from 'mobx-react';
import { type HTMLAttributes, type KeyboardEvent, type ReactNode, type RefObject, useRef } from 'react';

import { calculateIndex } from './calculateIndex';

export type KeyboardNavigableGridListRenderPropsType = {
  gridRef: RefObject<HTMLDivElement | null>;
} & Pick<HTMLAttributes<HTMLElement>, 'onKeyDown'>;

export type KeyboardNavigableGridListPropsType = {
  columns: number;
  minIndex: number;
  maxIndex: number;
  children: (props: KeyboardNavigableGridListRenderPropsType) => ReactNode;

  gridRef?: RefObject<HTMLDivElement | null>;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

export const KeyboardNavigableGridList = observer(
  ({
    gridRef = useRef<HTMLDivElement | null>(null),
    columns,
    children,
    minIndex,
    maxIndex,
  }: KeyboardNavigableGridListPropsType) => {
    const focusNextElement = (element: HTMLElement, parentElement: HTMLElement | null, offset: number) => {
      const { gridListIndex } = element.dataset;
      if (gridListIndex == null || parentElement == null) {
        return;
      }
      const nextElement: HTMLElement | null = parentElement.querySelector(
        `[data-grid-list-index="${calculateIndex(
          Number.parseInt(gridListIndex, 10),
          offset,
          minIndex,
          maxIndex,
          columns,
        )}"]`,
      );
      if (nextElement) {
        (element as HTMLElement).tabIndex = -1;
        nextElement.tabIndex = 0;
        nextElement.focus();
      }
    };

    const handleFocus = (event: KeyboardEvent<HTMLElement>, offset: number) => {
      event.preventDefault();
      event.stopPropagation();
      focusNextElement(event.target as HTMLElement, gridRef.current, offset);
    };
    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case 'ArrowLeft':
          handleFocus(event, -1);
          break;
        case 'ArrowRight':
          handleFocus(event, 1);
          break;
        case 'ArrowUp':
          handleFocus(event, -columns);
          break;
        case 'ArrowDown':
          handleFocus(event, columns);
          break;
      }
    };

    return <>{children({ onKeyDown, gridRef })}</>;
  },
);
