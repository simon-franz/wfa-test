import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { SetRequired } from 'type-fest';

import _FormGroup from '../FormGroup';
import { S as FormGroupStyles } from '../FormGroup/FormGroup.styles';
import type { FormGroupProps } from '../FormGroup/FormGroup.types';
import Icon from '../Icon';
import { S as LabelStyles } from '../Label/Label.styles';
import type { CheckboxProps } from './Checkbox.types';
import { S as HelpTextStyles } from '@hrworks/sui-shared/components/HelpText/HelpText.styles';

const componentConfig = {
  size: 1.125,
  borderRadius: {
    extraSmall: 3,
    small: 3,
    medium: 4,
    large: 5,
    extraLarge: 5,
  },
};

const FormGroup = styled(_FormGroup)<SetRequired<FormGroupProps, 'size'>>(
  ({ theme, justifyContent, disabled, size, validationState }) => ({
    [`&& ${LabelStyles.Wrapper}`]: {
      fontSize: theme.marko.typography.sqwFontSizes[size],
      ...(!disabled &&
        !validationState && {
          color: theme.sqwTier2Color.text.default,
        }),
    },
    [`&& ${FormGroupStyles.ClickArea}`]: {
      flexDirection: 'row',
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    [`${HelpTextStyles.HelpTextContainer}`]: {
      paddingLeft:
        justifyContent === 'center'
          ? 0
          : `calc(${componentConfig.size} * ${theme.marko.typography.sqwFontSizes[size]} + ${theme.marko.variables.spacing.formGap[size]})`,
    },
  }),
);

const checkboxInputStyles = css({
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  cursor: 'inherit',
});

const Checkbox = styled.div<Pick<Required<CheckboxProps>, 'size'>>(({ theme, size }) => ({
  position: 'relative',
  width: `${componentConfig.size}em`,
  height: `${componentConfig.size}em`,
  border: `1px solid ${theme.sqwTier2Color.border.input}`,
  backgroundColor: theme.sqwTier2Color.background.input,
  borderRadius: componentConfig.borderRadius[size],
  outline: '2px solid transparent',
  outlineOffset: 2,
  flexShrink: 0,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  transitionProperty: 'border-color, outline-color',
  transitionDuration: theme.marko.variables.animationDuration.normal,
}));

const CheckboxInput = styled.input(({ theme }) => [
  checkboxInputStyles,
  {
    [`:checked ~ ${Checkbox}`]: {
      backgroundColor: theme.sqwTier2Color.background.brand.bold.default,
      borderColor: theme.sqwTier2Color.background.brand.bold.default,

      [`${CheckIcon}`]: {
        opacity: 1,
      },
    },

    [`:disabled ~ ${Checkbox}`]: {
      backgroundColor: theme.sqwTier2Color.background.disabled.default,
      borderColor: theme.sqwTier2Color.border.disabled,
    },

    [`:checked:disabled ~ ${Checkbox}`]: {
      backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
      borderColor: theme.sqwTier2Color.background.brand.subtle.pressed,
    },

    [`:focus-visible ~ ${Checkbox}`]: {
      outlineColor: theme.sqwTier2Color.border.focus,
      position: 'relative',
    },
  },
]);

const CheckIcon = styled(Icon)(({ theme }) => ({
  fontSize: '.7em',
  opacity: 0,
  color: theme.sqwTier2Color.icon.inverse,
  transition: `opacity ${theme.marko.variables.animationDuration.normal}`,
}));

export const S = {
  componentConfig,
  FormGroup,
  checkboxInputStyles,
  CheckboxInput,
  Checkbox,
  CheckIcon,
} as const;
