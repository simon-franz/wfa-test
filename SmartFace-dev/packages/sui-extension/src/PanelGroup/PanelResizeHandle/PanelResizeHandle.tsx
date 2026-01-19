import { observer } from 'mobx-react';
import { useContext } from 'react';
import type { PanelResizeHandleProps } from 'react-resizable-panels';

import { PanelGroupContext } from '../PanelGroupContext';
import { S } from './PanelResizeHandle.styles';

export const PanelResizeHandle = observer((props: PanelResizeHandleProps) => {
  const { direction, setIsDragging } = useContext(PanelGroupContext);

  return (
    <S.StyledPanelResizeHandle onDragging={(isDragging) => setIsDragging(isDragging)} direction={direction} {...props}>
      <S.PanelResizeHandleGrip direction={direction} />
      <S.PanelResizeHandleLine direction={direction} />
    </S.StyledPanelResizeHandle>
  );
});
