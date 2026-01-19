import styled from '@emotion/styled';

const Section = styled.li(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMd,
  padding: `${theme.marko.variables.spacing.distance.extraSmall}px ${theme.marko.variables.spacing.distance.small}px`,
}));

export const S = {
  Section,
} as const;
