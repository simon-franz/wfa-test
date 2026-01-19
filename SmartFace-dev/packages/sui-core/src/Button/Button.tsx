import { observer } from 'mobx-react';
import { forwardRef } from 'react';

import { S } from './Button.styles';
import type { ButtonProps } from './Button.types.ts';

export const Button = observer(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        corner = 'rounded',
        disabled,
        href,
        htmlTag = 'button',
        leftIcon,
        rightIcon,
        size = 'medium',
        type = 'button',
        variant = 'filled',
        color = variant === 'text' ? 'secondary' : 'primary',
        ...otherProps
      },
      ref,
    ) => {
      const Element = typeof href === 'string' && !disabled ? 'a' : htmlTag;

      return (
        <S.Button
          as={Element}
          href={href}
          ref={ref}
          role="button"
          disabled={disabled}
          $color={color}
          corner={corner}
          size={size}
          variant={variant}
          type={type}
          {...otherProps}
        >
          {leftIcon && <S.Icon>{leftIcon}</S.Icon>}
          {children}
          {rightIcon && <S.Icon>{rightIcon}</S.Icon>}
        </S.Button>
      );
    },
  ),
);
