import styled from '@emotion/styled';
import type { SetRequired } from 'type-fest';

import { S as CheckboxStyles } from '../../Checkbox/Checkbox.styles';
import _FormGroup from '../../FormGroup';
import { S as FormGroupStyles } from '../../FormGroup/FormGroup.styles';
import type { FormGroupProps } from '../../FormGroup/FormGroup.types';
import type { RadioGroupProps } from '../RadioGroup.types';
import { S as HelpTextStyles } from '@hrworks/sui-shared/components/HelpText/HelpText.styles';

const FormGroup = styled(_FormGroup)<SetRequired<FormGroupProps, 'size'>>(
  ({ theme, justifyContent, size, disabled }) => ({
    [`${FormGroupStyles.ClickArea}`]: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      columnGap: theme.marko.variables.spacing.formGap[size],
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    [`${HelpTextStyles.HelpTextContainer}`]: {
      paddingLeft:
        justifyContent === 'center'
          ? 0
          : `calc(${CheckboxStyles.componentConfig.size} * ${theme.marko.typography.sqwFontSizes[size]} + ${theme.marko.variables.spacing.formGap[size]})`,
    },
  }),
);

const Radio = styled(CheckboxStyles.Checkbox)(({ theme }) => ({
  outlineOffset: 0,
  borderRadius: '100%',
  '::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: `0.2em solid ${theme.sqwTier2Color.background.input}`,
    backgroundColor: 'transparent',
    borderRadius: 'inherit',
  },
}));

const Input = styled.input<Pick<RadioGroupProps, 'disabled'>>(({ theme }) => [
  CheckboxStyles.checkboxInputStyles,
  {
    [`:checked ~ ${Radio}::after`]: {
      backgroundColor: theme.sqwTier2Color.background.brand.bold.default,
    },
    [`:disabled`]: {
      [`~ ${Radio}`]: {
        borderColor: theme.sqwTier2Color.border.disabled,
      },
      [`:checked ~ ${Radio}::after`]: {
        backgroundColor: theme.sqwTier2Color.background.brand.subtle.pressed,
      },
    },
    [`:focus-visible ~ ${Radio}`]: {
      outlineColor: theme.sqwTier2Color.border.focus,
    },
  },
]);

export const S = {
  FormGroup,
  Radio,
  Input,
} as const;
