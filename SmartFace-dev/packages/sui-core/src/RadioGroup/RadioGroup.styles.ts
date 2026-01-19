import styled from '@emotion/styled';
import type { SetRequired } from 'type-fest';

import { S as CheckboxGroupListStyles } from '../CheckboxGroup/List/CheckboxGroupList.styles';
import type { RadioGroupProps } from './RadioGroup.types';

type RadioGroupContainer = SetRequired<Pick<RadioGroupProps, 'optionsDirection' | 'size' | 'disabled'>, 'size'>;

const RadioGroupContainer = styled.div<RadioGroupContainer>(({ theme, optionsDirection, size, disabled }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: CheckboxGroupListStyles.generateGapStyles(theme, size),
  ...(disabled && {
    cursor: 'not-allowed',
  }),
  ...(optionsDirection === 'row' && {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }),
}));

export const S = {
  RadioGroupContainer,
} as const;
