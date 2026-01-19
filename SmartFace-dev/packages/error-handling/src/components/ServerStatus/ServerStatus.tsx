import { S } from './ServerStatus.styles';
import type { ServerStatusProps } from './ServerStatus.types';

export const ServerStatus = ({ statusCode, title, subtitle, media, ...otherProps }: ServerStatusProps) => (
  <S.Wrapper {...otherProps}>
    <S.Inner>
      {statusCode && <S.StatusCode>{statusCode}</S.StatusCode>}
      {title && <S.Title>{title}</S.Title>}
      {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
      {media && <S.Media>{media}</S.Media>}
    </S.Inner>
  </S.Wrapper>
);
