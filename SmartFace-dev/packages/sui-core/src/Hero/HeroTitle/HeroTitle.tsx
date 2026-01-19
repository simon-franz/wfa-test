import { S } from './HeroTitle.styles';
import type { HeroTitleProps } from './HeroTitle.types';

export const HeroTitle = ({ children, subtitle, alignTitle, ...otherProps }: HeroTitleProps) => (
  <S.TitleContainer {...otherProps}>
    {children && (
      <S.Title headerTag="h2" alignTitle={alignTitle}>
        {children}
      </S.Title>
    )}
    {subtitle && (
      <S.Subtitle as="div" alignTitle={alignTitle}>
        {subtitle}
      </S.Subtitle>
    )}
  </S.TitleContainer>
);
