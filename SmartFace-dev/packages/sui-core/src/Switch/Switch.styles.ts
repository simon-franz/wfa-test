import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import { S as CheckboxStyles } from '../Checkbox/Checkbox.styles';
import _FormGroup from '../FormGroup';
import type { FormGroupProps } from '../FormGroup/FormGroup.types';
import { S as LabelStyles } from '../Label/Label.styles';
import { S as HelpTextStyles } from '@hrworks/sui-shared/components/HelpText/HelpText.styles';

const componentConfig = {
  switchWidth: 2.25,
};

const FormGroup = styled(_FormGroup)<Pick<Required<FormGroupProps>, 'size'>>(
  ({ theme, justifyContent, size, disabled, validationState }) => ({
    [`&& ${LabelStyles.Wrapper}`]: {
      fontSize: theme.marko.typography.sqwFontSizes[size],
      ...(!disabled &&
        !validationState && {
          color: theme.sqwTier2Color.text.default,
        }),
    },

    [`${HelpTextStyles.HelpTextContainer}`]: {
      paddingLeft:
        justifyContent === 'center'
          ? 0
          : `calc(${componentConfig.switchWidth} * ${theme.marko.typography.sqwFontSizes[size]} + ${theme.marko.variables.spacing.formGap[size]})`,
    },
  }),
);

const SwitchInput = styled.input(({ theme }) => [
  CheckboxStyles.checkboxInputStyles,
  {
    [`:checked ~ ${Switch}`]: {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtlest.selected,

      '::after': {
        left: 'calc(100% - (1.25em))',
        backgroundColor: theme.sqwTier2Color.background.brand.bold.default,
      },
    },

    [`:disabled ~ ${Switch}`]: {
      backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,

      '::after': {
        backgroundColor: theme.sqwTier2Color.background.neutral.subtle.hovered,
      },

      [`:checked ~ ${Switch}`]: {
        backgroundColor: theme.sqwTier2Color.background.brand.subtle.hovered,

        '::after': {
          backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
        },
      },
    },

    [`:focus-visible ~ ${Switch}::after`]: {
      outline: `2px ${theme.sqwTier2Color.border.focus} solid`,
    },
  },
]);

const Switch = styled.span(({ theme }) => ({
  flexShrink: 0,
  width: `${componentConfig.switchWidth}em`,
  height: '1em',
  borderRadius: '.5em',
  backgroundColor: theme.sqwTier2Color.background.neutral.subtle.default,
  position: 'relative',
  [mq.conditionalTransition]: {
    transitionProperty: 'background-color',
    transitionDuration: theme.marko.variables.animationDuration.long,
  },
  '::after': {
    [mq.conditionalTransition]: {
      transitionProperty: 'background-color, left, scale',
      transitionDuration: theme.marko.variables.animationDuration.long,
    },
    content: "''",
    position: 'absolute',
    height: '1.25em',
    width: '1.25em',
    top: '-0.125em',
    left: '0',
    transform: 'translate(0, 0)',
    backgroundColor: theme.sqwTier2Color.background.neutral.bold,
    borderRadius: '100%',
    outlineOffset: 2,
  },
}));

export const S = {
  FormGroup,
  SwitchInput,
  Switch,
} as const;
