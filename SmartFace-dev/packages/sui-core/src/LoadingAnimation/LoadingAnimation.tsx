import { observer } from 'mobx-react';

import { S } from './LoadingAnimation.styles';
import type { LoadingAnimationProps } from './LoadingAnimation.types';
import { ShimmerAnimation } from './ShimmerAnimation';

export const LoadingAnimation = observer(
  ({ type, count, minWidth = 100, maxWidth = 100, ...otherProps }: LoadingAnimationProps) => (
    <S.Wrapper role="progressbar" type={type} minWidth={minWidth} maxWidth={maxWidth} {...otherProps}>
      {type === 'spinner' ? (
        <S.Spinner />
      ) : (
        <S.ShimmerContainer>
          {Array.from({ length: count && count > 0 ? count : 4 }).map((_, index) => (
            <ShimmerAnimation key={index} />
          ))}
        </S.ShimmerContainer>
      )}
    </S.Wrapper>
  ),
);
