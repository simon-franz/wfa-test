import { observer } from 'mobx-react';
import { type HTMLAttributes, type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { getListItems, type ListItem } from './getListMap';
import { S } from './KeyboardNavigableList.styles';
import { KeyboardNavigableListContext, type KeyboardNavigableListContextType } from './KeyboardNavigableListContext';
import { TrackLastEventType } from './TrackLastEventType';

export type KeyboardNavigableListPropsType = {
  children: ReactNode;
  onBlur?: () => void;
  onSelectedItemChange?: (item: ListItem | null) => void;
} & Omit<HTMLAttributes<HTMLUListElement>, 'children'>;

export const KeyboardNavigableList = observer(
  ({ id: _id, onBlur, children, onSelectedItemChange, ...otherProps }: KeyboardNavigableListPropsType) => {
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const generatedId = useId();
    const id = _id || generatedId;

    const listMapRef = useRef(new Map());
    const listItemsRef = useRef<ListItem[]>([]);

    const updateListMap = () => {
      const { map, root } = getListItems(listRef.current!);
      listMapRef.current = map;
      listItemsRef.current = root;
    };

    const evaluatedSetSelectedItem = useCallback(
      (itemId: string) => {
        if (selectedItem?.id !== itemId) {
          const nowSelectedItem = listMapRef.current.get(itemId)!;
          setSelectedItem(nowSelectedItem);
        }
      },
      [selectedItem?.id],
    );

    const handleArrowDown = useCallback(() => {
      if (selectedItem === null) {
        setSelectedItem(listItemsRef.current[0]);
      } else {
        const currentlySelectedItemIndex = selectedItem!.parentList.findIndex(({ id }) => selectedItem!.id === id);

        setSelectedItem(
          currentlySelectedItemIndex === selectedItem!.parentList.length - 1
            ? selectedItem!.parentList[0]
            : selectedItem!.parentList[currentlySelectedItemIndex + 1],
        );
      }
    }, [selectedItem]);

    const handleArrowUp = useCallback(() => {
      if (selectedItem === null) {
        setSelectedItem(listItemsRef.current.at(-1) ? listItemsRef.current.at(-1)! : null);
      } else {
        const currentlySelectedItemIndex = selectedItem!.parentList.findIndex(({ id }) => selectedItem!.id === id);

        setSelectedItem(
          currentlySelectedItemIndex === 0
            ? selectedItem!.parentList.at(-1)
              ? selectedItem!.parentList.at(-1)!
              : null
            : selectedItem!.parentList[currentlySelectedItemIndex - 1],
        );
      }
    }, [selectedItem]);

    const handleArrowRight = useCallback(() => {
      if (selectedItem && selectedItem.sublist) {
        setSelectedItem(selectedItem.sublist[0]);
      }
    }, [selectedItem]);

    const handleArrowLeft = useCallback(() => {
      if (selectedItem && selectedItem.path.length > 0) {
        setSelectedItem(selectedItem.path.at(-1)!);
      }
    }, [selectedItem]);

    const handleEscape = useCallback(() => {
      setSelectedItem(null);
      onBlur && onBlur();
    }, [onBlur]);

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        const { key } = event;

        if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(key)) {
          event.preventDefault();
        }

        switch (key) {
          case 'ArrowDown':
            handleArrowDown();
            break;
          case 'ArrowUp':
            handleArrowUp();
            break;
          case 'ArrowRight':
            handleArrowRight();
            break;
          case 'ArrowLeft':
            handleArrowLeft();
            break;
          case 'Escape':
            handleEscape();
            break;
        }
      },
      [handleArrowDown, handleArrowLeft, handleArrowRight, handleArrowUp, handleEscape],
    );

    useEffect(() => {
      window.addEventListener('keydown', onKeyDown, false);
      updateListMap();

      return () => {
        window.removeEventListener('keydown', onKeyDown, false);
      };
    }, [onKeyDown]);

    const contextValue: KeyboardNavigableListContextType = useMemo(
      () => ({
        selectedItem,
        openedSublists: selectedItem
          ? selectedItem.sublistId && window.sfLastEventType === 'pointer'
            ? [...selectedItem.openedSublists, selectedItem.sublistId]
            : selectedItem.openedSublists
          : [],
        setSelectedItem: evaluatedSetSelectedItem,
        listMap: listMapRef.current,
      }),
      [evaluatedSetSelectedItem, selectedItem],
    );

    return (
      <KeyboardNavigableListContext.Provider value={contextValue}>
        <TrackLastEventType />
        <S.List data-keyboard-navigable-list-menu-id={id} ref={listRef} {...otherProps}>
          {children}
        </S.List>
      </KeyboardNavigableListContext.Provider>
    );
  },
);
