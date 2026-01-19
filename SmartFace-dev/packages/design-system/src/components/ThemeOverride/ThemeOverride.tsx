import { S } from './ThemeOverride.styles';
import type { ThemeOverrideProps } from './ThemeOverride.types';

export const ThemeOverride = ({ theme, ...otherProps }: ThemeOverrideProps) => (
  <S.DefaultStyleProvider data-theme={theme} {...otherProps} />
);
