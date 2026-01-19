'use no memo';
import { useVirtualizer, type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';
import { type MutableRefObject, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { HeadlessComboBoxContext } from '../';
import type { useCache } from '../util';

export type UseComboBoxListReturn = {
  shouldGetResult: boolean;
  virtualItems: VirtualItem[] | null;
  height: number;
  optionRef: Virtualizer<HTMLDivElement, HTMLDivElement>['measureElement'];
  onMouseLeave(): void;
};

export const useComboBoxList = (
  ref: MutableRefObject<HTMLDivElement | null>,
  currentCache: ReturnType<ReturnType<typeof useCache>['getCurrentCache']>,
  loadMore: ReturnType<typeof useCache>['getResult'],
): UseComboBoxListReturn => {
  const { activeItemIndex, query, select, setActiveItemIndex, setOpen, shouldGetResult } =
    useContext(HeadlessComboBoxContext);

  const virtualizer = useVirtualizer({
    count: currentCache ? (currentCache.more ? currentCache.options.length + 1 : currentCache.options.length) : 1,
    getScrollElement: () => ref.current,
    estimateSize: () => 20,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Load more options based on various conditions
  useEffect(() => {
    const lastItem = virtualItems.at(-1);
    if (currentCache && !lastItem) {
      return;
    }
    if (
      shouldGetResult &&
      virtualItems &&
      (currentCache == null ||
        lastItem == null ||
        (!currentCache.isLoading && lastItem.index >= currentCache.options.length))
    ) {
      loadMore(query);
    }
  }, [virtualItems, query, currentCache, loadMore, shouldGetResult]);

  // Used for keyboard navigation (the useEffect below)
  const itemAmount = useMemo<number | null>(() => currentCache?.options.length ?? null, [currentCache?.options.length]);

  // Keyboard navigation of the list
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (itemAmount == null || itemAmount === 0) {
        return;
      }
      switch (event.key) {
        case 'Home': {
          event.stopPropagation();
          setActiveItemIndex(0);
          virtualizer.scrollToIndex(0);

          return;
        }
        case 'End': {
          event.stopPropagation();
          setActiveItemIndex(itemAmount - 1);
          virtualizer.scrollToIndex(itemAmount - 1);

          return;
        }
        case 'ArrowDown': {
          event.stopPropagation();
          const newIndex = activeItemIndex == null ? 0 : (activeItemIndex + 1) % itemAmount;
          setActiveItemIndex(newIndex);
          virtualizer.scrollToIndex(newIndex);

          return;
        }
        case 'ArrowUp': {
          event.stopPropagation();
          const newIndex = activeItemIndex == null ? itemAmount - 1 : (activeItemIndex + itemAmount - 1) % itemAmount;
          setActiveItemIndex(newIndex);
          virtualizer.scrollToIndex(newIndex);

          return;
        }
        case 'Enter': {
          event.stopPropagation();
          if (activeItemIndex != null) {
            const item = currentCache?.options?.[activeItemIndex];
            item && select(item);
          }

          return;
        }
        case 'Escape': {
          event.stopPropagation();
          setOpen(false);

          return;
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeItemIndex, currentCache, itemAmount, select, setActiveItemIndex, setOpen, virtualItems, virtualizer]);

  // Remove active state from active option in list when cursor moves away from the list
  const onMouseLeave = useCallback(() => {
    setActiveItemIndex(null);
  }, [setActiveItemIndex]);

  // On initial request, use this variable to differentiate between no options and no options yet
  const isInitialFetching = useMemo<boolean>(
    () => !currentCache || (currentCache?.isLoading && currentCache.options.length === 0),
    [currentCache],
  );

  // Used for force rerender. Can be done with empty objects since the reference changes
  const [, setRerenderValue] = useState({});

  // Force rerender because tanstack/virtual returns empty array because container gets created on the fly
  // See https://github.com/TanStack/virtual/issues/596
  useEffect(() => {
    if (
      currentCache &&
      !currentCache.isLoading &&
      virtualItems.length === 0 &&
      (currentCache.more || currentCache.options.length !== 0)
    ) {
      queueMicrotask(() => setRerenderValue({}));
    }
  }, [currentCache, virtualItems, virtualItems.length]);

  return {
    shouldGetResult,
    virtualItems: isInitialFetching ? null : virtualItems,
    height: virtualizer.getTotalSize(),
    optionRef: virtualizer.measureElement,
    onMouseLeave,
  };
};
