import styled from '@emotion/styled';
import { resetListStyles } from '@hrworks/design-system/stylePresets';

import { generatePaddings } from './Entry/BaseItem/CollapsibleMenuBaseItem.styles';

const Container = styled.ul(({ theme }) => [
  resetListStyles,
  generatePaddings({
    theme,
  }),
  {
    '--collapsible-menu-depth-indicator-color': theme.sqwTier2Color.border.bold,
    padding: `0 ${theme.marko.variables.spacing.distance.small}px ${theme.marko.variables.spacing.distance.small}px ${theme.marko.variables.spacing.distance.small}px`,
  },
]);

export const S = {
  Container,
} as const;
