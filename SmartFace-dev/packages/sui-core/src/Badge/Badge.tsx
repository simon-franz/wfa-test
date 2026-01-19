import { useMediaQuery } from '@hrworks/design-system';
import { forwardRef } from 'react';

import { Tooltip } from '../Tooltip/Tooltip';
import { S } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      anchor,
      children,
      variant = 'filled',
      corner = 'pill',
      size = 'medium',
      dot,
      color = 'primary',
      fullWidth,
      text,
      ...otherProps
    }: BadgeProps,
    ref,
  ) => {
    const _mainAxisOffsetForTooltip = -26;
    const isTouchDevice = useMediaQuery('isTouchDevice');

    const badge = (
      <S.Badge
        anchor={anchor}
        variant={variant}
        corner={corner}
        size={size}
        dot={dot}
        $color={color}
        fullWidth={fullWidth}
        ref={ref}
        {...(dot &&
          isTouchDevice && {
            onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
            },
          })}
        {...otherProps}
      >
        {dot ? <S.TextWrapper>{children}</S.TextWrapper> : children}
      </S.Badge>
    );

    if (dot && (text || children) && !anchor) {
      return (
        <Tooltip
          mainAxisOffset={_mainAxisOffsetForTooltip}
          trigger="hoverOrTouch"
          customTooltip={
            <Badge color={color} corner={corner} variant={variant} css={{ pointerEvents: 'none' }}>
              {text || children}
            </Badge>
          }
        >
          {badge}
        </Tooltip>
      );
    }

    return anchor && !children ? (
      <>{anchor}</>
    ) : anchor && children ? (
      <S.Container fullWidth={fullWidth}>
        {anchor}
        {badge}
      </S.Container>
    ) : (
      <>{badge}</>
    );
  },
);
