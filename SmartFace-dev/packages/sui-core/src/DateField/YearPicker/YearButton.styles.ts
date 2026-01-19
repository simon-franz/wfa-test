import styled from '@emotion/styled';

import { S as MonthButtonStyles } from '../MonthPicker/MonthButton.styles';

const Button = styled(MonthButtonStyles.Button)(({ theme }) => ({
  outlineOffset: -2,
  padding: theme.marko.variables.spacing.distance.extraSmall,
}));

export const S = {
  Button,
} as const;
