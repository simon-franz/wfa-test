import styled from '@emotion/styled';
import { overflowHyphens } from '@hrworks/design-system/stylePresets';
import type { SetRequired } from 'type-fest';

import { S as LabelStyles } from '../Label/Label.styles';
import type { FormGroupProps } from './FormGroup.types';
import { S as HelpTextStyles } from '@hrworks/sui-shared/components/HelpText/HelpText.styles';

type ContainerProps = SetRequired<
  Pick<FormGroupProps, 'disabled' | 'justifyContent' | 'size' | 'validationState'>,
  'size'
>;

const Container = styled.div<ContainerProps>(({ theme, size, disabled, justifyContent, validationState }) => ({
  display: 'flex',
  width: justifyContent === 'flex-start' ? 'fit-content' : '100%',
  flexDirection: 'column',
  fontSize: theme.marko.typography.sqwFontSizes[size],
  alignItems: justifyContent,
  cursor: 'auto',
  ...(justifyContent === 'space-between' && {
    [`${ClickArea}`]: {
      justifyContent,
    },
    [`${HelpTextStyles.HelpTextContainer}`]: {
      alignSelf: 'flex-end',
    },
  }),

  '&:not(& &)': {
    [`${LabelStyles.Wrapper}`]: {
      ...theme.sqwTier2Typography.labelMd,
      fontSize: theme.marko.typography.sqwFontSizes[size],
    },
  },

  ...(!validationState && {
    ...(!disabled && {
      ':not(& &)': {
        [`${LabelStyles.Wrapper}`]: {
          color: theme.sqwTier2Color.text.subtlest,
        },
      },
    }),
  }),

  ...(disabled && {
    color: theme.sqwTier2Color.text.disabled,
    [` ${LabelStyles.Wrapper}`]: {
      color: 'inherit',
    },

    [`${HelpTextStyles.HelpTextContainer}`]: {
      color: 'inherit',
    },
  }),
}));

type ClickAreaProps = SetRequired<Pick<FormGroupProps, 'disabled' | 'size'>, 'size'>;

const ClickArea = styled.label<ClickAreaProps>(({ theme, disabled, size }) => [
  overflowHyphens,
  {
    display: 'flex',
    position: 'relative',
    columnGap: theme.marko.variables.spacing.formGap[size],
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  },
]);

export const S = {
  Container,
  ClickArea,
} as const;
