import { useResponsiveProp } from '@hrworks/sui-shared/hooks/useResponsiveProp';
import { observer } from 'mobx-react';
import { Children, type RefObject, useContext, useRef, useState } from 'react';
import {
  type ImperativePanelGroupHandle,
  type ImperativePanelHandle,
  PanelGroup as ReactResizablePanelGroup,
} from 'react-resizable-panels';

import { S } from './PanelGroup.styles';
import type { PanelGroupProps } from './PanelGroup.types';
import { PanelGroupContext } from './PanelGroupContext';

export const PanelGroup = observer(({ defaultThreshold, direction, children, ...otherProps }: PanelGroupProps) => {
  const ref = useRef<ImperativePanelGroupHandle>(null);
  const orderCounterRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [resizingPanelId, setResizingPanelId] = useState('');
  const [growingPanelRef, setGrowingPanelRef] = useState<RefObject<ImperativePanelHandle | null>>();
  const [growingPanelOrder, setGrowingPanelOrder] = useState(0);
  const context = useContext(PanelGroupContext);
  const isNestedInPanelGroup = !!Object.keys(context).length;

  const hasOnlyOnePanelGroupItem = Children.toArray(children).length === 1;

  // Make sure nested PanelGroups use defaultThreshold from outer PanelGroup
  // ...and if no defaultThreshold is given to outer PanelGroup set its defaultThreshold to 'extraLarge'
  const _defaultThreshold = defaultThreshold || context.defaultThreshold || 'extraLarge';

  const _direction = useResponsiveProp(direction) || 'horizontal';

  return (
    <PanelGroupContext.Provider
      value={{
        hasOnlyOnePanelGroupItem,
        direction: _direction,
        defaultThreshold: _defaultThreshold,
        isDragging,
        setIsDragging,
        growingPanelRef,
        setGrowingPanelRef,
        orderCounterRef,
        growingPanelOrder,
        setGrowingPanelOrder,
        resizingPanelId,
        setResizingPanelId,
      }}
    >
      <S.Wrapper isNestedInPanelGroup={isNestedInPanelGroup} {...otherProps}>
        <ReactResizablePanelGroup ref={ref} direction={_direction}>
          {children}
        </ReactResizablePanelGroup>
      </S.Wrapper>
    </PanelGroupContext.Provider>
  );
});
