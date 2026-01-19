import styled from '@emotion/styled';
import { generateShadowStyles, resetListStyles } from '@hrworks/design-system';

const Wrapper = styled.div(({ theme }) => [
  generateShadowStyles({
    theme,
  }),
  {
    backgroundColor: theme.sqwTier2Color.background.input,
    border: `1px solid ${theme.sqwTier2Color.border.bold}`,
    borderRadius: 6,
    padding: theme.marko.variables.spacing.distance.extraSmall,
    cursor: 'default',
    width: 200, // TODO dynamic width
  },
]);

const Menu = styled.ul([resetListStyles]);

const Divider = styled.hr(({ theme }) => ({
  borderColor: theme.sqwTier2Color.border.bold,
  borderWidth: '0 0 1px 0',
  margin: theme.marko.variables.spacing.distance.extraSmall,
}));

export const S = {
  Wrapper,
  Menu,
  Divider,
} as const;
