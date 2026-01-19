import type { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { Size } from '@hrworks/types/shared/UiTypes';
import type { SetRequired } from 'type-fest';

import type { CheckboxGroupListProps } from './CheckboxGroupList.types';

const generateGapStyles = (theme: Theme, size: Size) =>
  `${theme.marko.variables.spacing.formGap[size]} calc(${theme.marko.variables.spacing.formGap[size]} * 2)`;

type ListProps = SetRequired<Pick<CheckboxGroupListProps, 'disabled' | 'optionsDirection' | 'size'>, 'size'>;

const List = styled.div<ListProps>(({ theme, size, optionsDirection }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: generateGapStyles(theme, size),
  ...(optionsDirection === 'row' && {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }),
}));

export const S = {
  generateGapStyles,
  List,
} as const;
