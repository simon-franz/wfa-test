import { S } from './CardTitle.styles';
import type { CardTitleProps } from './CardTitle.types';

export const CardTitle = ({ icon, children, subtitle, ...otherProps }: CardTitleProps) => (
  <S.Title
    icon={icon}
    breakTitleChildrenWithChildren
    titleChildren={subtitle && <S.Subtitle fontSize="small">{subtitle}</S.Subtitle>}
    size="extraLarge"
    {...otherProps}
  >
    {children}
  </S.Title>
);
