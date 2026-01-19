import styled from '@emotion/styled';
import { generateShadowStyles } from '@hrworks/design-system';
import { mq } from '@hrworks/design-system/mediaQueries';

const Notifications = styled.div(({ theme }) => [
  generateShadowStyles({
    theme,
    variant: 'default',
    type: 'drop',
  }),
  {
    position: 'fixed',
    zIndex: theme.marko.variables.zIndex.notifications,
    right: 6,
    left: 6,
    gap: 6,
    bottom: 30,
    display: 'flex',
    flexDirection: 'column',

    [mq['>=sm']]: {
      right: 30,
      left: 'unset',
      width: 400,
    },
  },
]);

export const S = {
  Notifications,
};
