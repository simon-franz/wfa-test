import { S } from './Caret.styles';
import type { CaretProps } from './Caret.types';

export const Caret = (props: CaretProps) => (
  <S.CaretContainer {...props}>
    <S.Caret />
  </S.CaretContainer>
);
