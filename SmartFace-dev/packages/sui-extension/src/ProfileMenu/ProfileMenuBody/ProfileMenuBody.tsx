import { S } from './ProfileMenuBody.styles';
import type { ProfileMenuBodyProps } from './ProfileMenuBody.types';

export const ProfileMenuBody = ({ children, ...otherProps }: ProfileMenuBodyProps) => (
  <S.Wrapper {...otherProps}>{children}</S.Wrapper>
);
