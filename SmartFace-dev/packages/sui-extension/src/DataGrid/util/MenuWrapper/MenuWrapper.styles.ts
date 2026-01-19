import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';

const Menu = styled.div(({ theme }) => [
  generateShadowStyles({
    theme,
  }),
  {
    backgroundColor: theme.sqwTier2Color.background.input,
    border: `1px solid ${theme.sqwTier2Color.border.bold}`,
    borderRadius: 6,
    padding: theme.marko.variables.spacing.distance.extraSmall,
    cursor: 'default',
  },
]);

export const S = {
  Menu,
} as const;
