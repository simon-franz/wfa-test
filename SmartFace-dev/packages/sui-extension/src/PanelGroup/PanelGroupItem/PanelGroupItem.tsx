import { observer } from 'mobx-react';
import { useContext, useEffect, useId, useRef, useState } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';

import { PanelGroupContext } from '../PanelGroupContext';
import { S } from '../PanelGroupItem/PanelGroupItem.styles';
import type { PanelGroupItemProps } from './PanelGroupItem.types';

export const thresholds = {
  extraSmall: 5,
  small: 10,
  medium: 15,
  large: 20,
  extraLarge: 25,
};

export const PanelGroupItem = observer(
  ({ id: _id, size, onResize, threshold, children, ...otherProps }: PanelGroupItemProps) => {
    const [isBelowThreshold, setIsBelowThreshold] = useState(false);
    const [lastSize, setLastSize] = useState(0);
    const [order, setOrder] = useState(0);
    const ref = useRef<ImperativePanelHandle>(null);
    const generatedId = useId();
    const id = _id || generatedId;
    const {
      isDragging,
      defaultThreshold,
      resizingPanelId,
      setResizingPanelId,
      growingPanelRef,
      setGrowingPanelRef,
      orderCounterRef,
      growingPanelOrder,
      setGrowingPanelOrder,
      hasOnlyOnePanelGroupItem,
    } = useContext(PanelGroupContext);

    const calculatedThreshold = threshold
      ? thresholds[threshold]
      : defaultThreshold
        ? thresholds[defaultThreshold]
        : undefined;

    useEffect(() => {
      if (size === undefined || calculatedThreshold === undefined || hasOnlyOnePanelGroupItem) return;

      if (size > calculatedThreshold) {
        ref.current?.resize(size);
        setIsBelowThreshold(size < calculatedThreshold);
      }
    }, [size, calculatedThreshold, hasOnlyOnePanelGroupItem]);

    useEffect(() => {
      if (isBelowThreshold && !isDragging) {
        const shrinkingPanelSize = ref.current?.getSize();
        ref.current?.resize(0);

        // fixes bug of growing PanelGroupItem left of shrinking PanelGroupItem not taking over space
        if (growingPanelRef && growingPanelOrder < order) {
          const growingPanel = growingPanelRef.current;
          if (growingPanel && shrinkingPanelSize) {
            growingPanel.resize(growingPanel.getSize() + shrinkingPanelSize);
          }
        }
      }
    }, [growingPanelOrder, growingPanelRef, isBelowThreshold, isDragging, order]);

    useEffect(() => {
      if (isDragging && resizingPanelId === id) return;

      setLastSize(0);
    }, [id, isDragging, resizingPanelId]);

    const _onResize = (newSize: number) => {
      onResize?.(newSize);

      // Determine which panel is growing (growingPanelElement)
      if (newSize > lastSize && !isBelowThreshold) {
        setGrowingPanelRef(ref);
        setGrowingPanelOrder(order);
      }
      setLastSize(newSize);
      setResizingPanelId(id);

      calculatedThreshold !== undefined && setIsBelowThreshold(newSize <= calculatedThreshold);
    };

    // set order values for all PanelGroupItems to determine their position within PanelGroup
    // ...makes sure correct PanelGroupItem takes over the space of a closed PanelGroupItem
    useEffect(() => {
      if (!order && orderCounterRef) {
        setOrder(orderCounterRef.current);
        orderCounterRef.current++;
      }
    }, [order, orderCounterRef]);

    return (
      <S.StyledPanel
        $enableAnimation={!isDragging && isBelowThreshold}
        defaultSize={size}
        onResize={_onResize}
        ref={ref}
        id={id}
        order={order}
        {...otherProps}
      >
        <S.Scroller $isBelowThreshold={isBelowThreshold}>{children}</S.Scroller>
      </S.StyledPanel>
    );
  },
);
