import { S } from './ProgressLinear.styles';
import type { ProgressLinearProps } from './ProgressLinear.types';

export const ProgressLinear = ({
  progress = 100,
  color = 'primary',
  animated = true,
  size = 'medium',
  ...otherProps
}: ProgressLinearProps) => (
  <S.Wrapper size={size} {...otherProps}>
    <S.Line
      style={{ left: `calc(-100% + ${progress}%)` }}
      $color={color}
      animated={animated}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemax={100}
    />
  </S.Wrapper>
);
