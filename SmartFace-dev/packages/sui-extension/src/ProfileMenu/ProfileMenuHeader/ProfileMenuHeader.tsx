import { S } from './ProfileMenuHeader.styles';
import type { ProfileMenuHeaderProps } from './ProfileMenuHeader.types';

export const ProfileMenuHeader = ({ portrait, title, subtitle, children, ...otherProps }: ProfileMenuHeaderProps) => (
  <S.Wrapper {...otherProps}>
    <S.UserPic>
      <S.UserPicImageWrapper>{portrait}</S.UserPicImageWrapper>
    </S.UserPic>
    <S.UserDetails>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subtitle}</S.SubTitle>
      {children && <div>{children}</div>}
    </S.UserDetails>
  </S.Wrapper>
);
