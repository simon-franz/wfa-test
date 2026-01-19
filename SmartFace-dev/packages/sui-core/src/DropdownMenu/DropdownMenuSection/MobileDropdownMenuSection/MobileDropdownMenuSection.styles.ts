import styled from '@emotion/styled';

import _CollapsibleMenuSection from '../../../CollapsibleMenu/Section';

const CollapsibleMenuSection = styled(_CollapsibleMenuSection)(({ theme }) => ({
  ':not(:first-of-type)': {
    marginTop: theme.marko.variables.spacing.distance.large,
  },
}));

export const S = {
  CollapsibleMenuSection,
} as const;
