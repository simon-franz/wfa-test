import { S } from './TextDivider.styles';
import type { TextDividerProps } from './TextDivider.types';

export const TextDivider = ({ children, ...otherProps }: TextDividerProps) => {
  return children ? (
    <S.Container {...otherProps}>
      <S.Line />
      <S.TextWrapper>{children}</S.TextWrapper>
      <S.Line />
    </S.Container>
  ) : (
    <S.Line {...otherProps} />
  );
};
