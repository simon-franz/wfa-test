import styled from '@emotion/styled';

import { FormGroup as _FormGroup } from './FormGroup';
import { S as FormGroupStyles } from './FormGroup.styles';
import type { FormGroupProps } from './FormGroup.types';

const GroupFormGroup = styled(_FormGroup)<Pick<Required<FormGroupProps>, 'size'>>(({ theme, size }) => ({
  [`${FormGroupStyles.ClickArea}`]: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    cursor: 'auto',
    rowGap: theme.marko.variables.spacing.formGap[size],
  },
}));

export const S = {
  GroupFormGroup,
} as const;
