import { css, keyframes, type Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { mq, overflowEllipsis, shouldForwardProp } from '@hrworks/design-system';
import { HelpText as _HelpText } from '@hrworks/sui-shared/components/HelpText';
import type { Size } from '@hrworks/types/shared/UiTypes';
import type { SetRequired } from 'type-fest';

import { S as ButtonStyles } from '../Button/Button.styles';
import type { InputFieldProps } from './InputField.types';
import type { HelpTextProps } from '@hrworks/sui-shared/components/HelpText/HelpText.types';

const componentConfig = {
  buttonFontSize: '0.875em',
  offsetX: {
    extraSmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    extraLarge: 20,
  },
  offsetY: {
    extraSmall: 8,
    small: 10,
    medium: 12,
    large: 14,
    extraLarge: 16,
  },
};

const generateInputBoxShadowStyles = ({ color, width = 1 }: { color: string; width?: number }) =>
  `0px 0px 0px ${width}px inset ${color}`;

const Container = styled.div<{ size: Size }>(({ theme, size }) => ({
  position: 'relative',
  fontSize: theme.marko.typography.sqwFontSizes[size],
  [mq.conditionalTransition]: {
    transitionProperty: 'all',
    transitionDuration: theme.marko.variables.animationDuration.normal,
  },
}));

const InputContainer = styled.div({
  position: 'relative',
});

const floatingLabelStyles = (theme: Theme) => {
  // Solves a bug for the onClick on the ComboBox where it wouldnt trigger the onclick.
  const enablePointerEvents = keyframes({
    100: {
      pointerEvents: 'all',
    },
  });

  return css({
    ...theme.sqwTier2Typography.bodySm,
    fontSize: '0.857em',
    top: 0,
    cursor: 'default',
    animation: `${enablePointerEvents} ${theme.marko.variables.animationDuration.normal}`,
  });
};

type LabelProps = {
  isLabelFloating: boolean;
  size: Size;
} & Pick<InputFieldProps, 'hasButton' | 'hasInputFocus' | 'disabled' | 'validationState'>;

const Label = styled.label<LabelProps>(
  ({ theme, isLabelFloating, size, hasButton, hasInputFocus, disabled, validationState }) => [
    {
      [mq.conditionalTransition]: {
        transitionProperty: 'top, max-width',
        transitionDuration: theme.marko.variables.animationDuration.normal,
      },
      '*': {
        transitionProperty: 'font-size, color',
        transitionDuration: theme.marko.variables.animationDuration.normal,
      },
      display: 'inline-flex',
      position: 'absolute',
      alignItems: 'center',
      gap: '0.375em',
      cursor: 'text',
      fontSize: '1em',
      padding: '0 0.666em',
      zIndex: 2,
      pointerEvents: 'none',
      top: '50%',
      transform: 'translateY(-50%)',
      left: `calc(${componentConfig.offsetX[size]}px - 0.666em)`,
      maxWidth: `calc(100% - 2 * 0.666em)`,
      borderRadius: 6,
      backgroundColor: theme.sqwTier2Color.background.input,
      color: theme.sqwTier2Color.text.subtlest,

      ...(hasInputFocus && {
        color: theme.sqwTier2Color.text.selected,
      }),

      ...(validationState && {
        color: theme.sqwTier2Color.text[validationState === 'danger' ? 'error' : validationState].default,
      }),

      ...(disabled && {
        color: theme.sqwTier2Color.text.disabled,
        backgroundColor: theme.sqwTier2Color.background.disabled.subtle,
      }),

      ...(hasButton &&
        !isLabelFloating && {
          maxWidth: `calc(100% -  (${componentConfig.buttonFontSize} + 2 *
            ${componentConfig.offsetX[size]}px ))`,
        }),
    },
    isLabelFloating && floatingLabelStyles(theme),
  ],
);

const LabelText = styled.div(overflowEllipsis);

const HelpText = styled(_HelpText, {
  shouldForwardProp,
})<SetRequired<HelpTextProps, 'size'>>(({ size }) => ({
  paddingLeft: componentConfig.offsetX[size],
  paddingRight: componentConfig.offsetX[size],
}));

const inputStyles = (
  theme: Theme,
  validationState: InputFieldProps['validationState'],
  size: Size,
  hasButton?: boolean,
  disabled?: boolean,
) =>
  css({
    lineHeight: theme.sqwTier2Typography.bodyMd.lineHeight,
    display: 'block',
    width: '100%',
    color: theme.sqwTier2Color.text.default,
    border: 0,
    borderRadius: 6,
    outline: '1px solid transparent',
    backgroundColor: theme.sqwTier2Color.background.input,
    padding: `${componentConfig.offsetY[size]}px ${componentConfig.offsetX[size]}px`,
    boxShadow: generateInputBoxShadowStyles({ color: theme.sqwTier2Color.border.input }),

    ':focus-visible': {
      // Fix dotted outline set by modern-normalize in Firefox.
      outline: '1px solid transparent',
    },

    '::placeholder, & ::placeholder': {
      color: theme.sqwTier2Color.text.subtlest,
      opacity: 1,
    },

    [mq.conditionalTransition]: {
      transitionProperty: 'color, outline, border-color, box-shadow',
      transitionDuration: theme.marko.variables.animationDuration.normal,
    },

    ':focus,:focus-within': {
      boxShadow: generateInputBoxShadowStyles({ color: theme.sqwTier2Color.border.selected, width: 2 }),
    },

    ...(hasButton && {
      paddingRight: `calc(
          ${componentConfig.buttonFontSize} + 2 *
            ${componentConfig.offsetX[size]}px
        )`,
    }),

    ...(validationState &&
      (() => {
        const validationColor = theme.sqwTier2Color.border[validationState === 'danger' ? 'error' : validationState];

        return {
          boxShadow: generateInputBoxShadowStyles({
            color: validationColor,
          }),

          ':focus,:focus-within': {
            boxShadow: generateInputBoxShadowStyles({
              color: validationColor,
              width: 2,
            }),
          },
        };
      })()),

    ':-webkit-autofill': {
      [` ~ ${Label}`]: floatingLabelStyles(theme),
    },

    ...(disabled && {
      cursor: 'not-allowed',
      color: theme.sqwTier2Color.text.disabled,
      backgroundColor: theme.sqwTier2Color.background.disabled.subtle,
      boxShadow: generateInputBoxShadowStyles({ color: theme.sqwTier2Color.border.disabled }),
    }),
  });

const buttonStyles = (theme: Theme, size: Size, disabled?: boolean) =>
  css([
    ButtonStyles.generateButtonStyles({ theme, size, variant: 'subtle', corner: 'pill', disabled }),
    {
      '&&': { position: 'absolute' },
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: `calc(1em + 1.5 * ${componentConfig.offsetX[size]}px)`,
      aspectRatio: '1/1',
      justifyContent: 'center',
      padding: 0,
      margin: `0 ${componentConfig.offsetX[size] / 4}px`,
      outlineOffset: -1,
      zIndex: 3,
      fontSize: componentConfig.buttonFontSize,
    },
  ]);

export const S = {
  componentConfig,
  Container,
  InputContainer,
  Label,
  LabelText,
  HelpText,
  inputStyles,
  buttonStyles,
} as const;
