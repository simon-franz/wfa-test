import { useTheme } from '@emotion/react';
import { observer } from 'mobx-react';

import { HTML } from '../Html';
import { S } from './Text.styles';
import type { TextProps } from './Text.types';

export const Text = observer(
  ({
    children,
    variant = 'default',
    hover,
    color,
    fontSize = 'medium',
    fontWeight = 'normal',
    html,
    htmlTag,
    fullWidth,
    underlined,
    italic,
    textAlign,
    overflowBehaviour = 'break',
    ...otherProps
  }: TextProps) => {
    const Element = overflowBehaviour === 'ellipsis' ? 'div' : htmlTag || (otherProps.href ? 'a' : 'span');

    const currentTheme = useTheme();
    const styles = S.textStyles({
      variant,
      hover,
      fullWidth,
      color,
      fontSize,
      fontWeight,
      underlined,
      italic,
      textAlign,
      theme: currentTheme,
      href: otherProps.href,
      overflowBehaviour,
    });

    return html ? (
      <HTML css={styles} html={typeof children === 'string' ? children : ''} htmlTag={Element} {...otherProps} />
    ) : (
      <Element css={styles} {...otherProps}>
        {children}
      </Element>
    );
  },
);
