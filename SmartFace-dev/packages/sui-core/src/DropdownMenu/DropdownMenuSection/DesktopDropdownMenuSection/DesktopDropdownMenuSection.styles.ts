import styled from '@emotion/styled';
import { overflowBreakWord } from '@hrworks/design-system/stylePresets';

const Section = styled.li(({ theme }) => [
  overflowBreakWord,
  {
    ...theme.sqwTier2Typography.labelMd,
    padding: `${theme.marko.variables.spacing.distance.extraSmall}px ${theme.marko.variables.spacing.distance.small}px`,
  },
]);

export const S = {
  Section,
} as const;
