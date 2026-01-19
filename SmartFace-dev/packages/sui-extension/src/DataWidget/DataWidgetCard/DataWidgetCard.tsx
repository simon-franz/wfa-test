import Button from '@hrworks/sui-core/Button';
import { Scroller } from '@hrworks/sui-core/Scroller';

import { S } from './DataWidgetCard.styles';
import type { DataWidgetCardProps } from './DataWidgetCard.types';

export const DataWidgetCard = ({ children, onToggleValue, label, icon, ...otherProps }: DataWidgetCardProps) => (
  <S.Card {...otherProps}>
    <S.Header>
      <S.Label>{label}</S.Label>
      <Button variant="text" onClick={onToggleValue}>
        <S.IconContainer>{icon}</S.IconContainer>
      </Button>
    </S.Header>
    <Scroller>{children} </Scroller>
  </S.Card>
);
