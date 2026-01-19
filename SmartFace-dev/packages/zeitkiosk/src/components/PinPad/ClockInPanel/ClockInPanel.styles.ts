import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import { Title } from '../../Typography/Title';

const ClockInPanelContainer = styled.div({
  display: 'flex',
  gap: '2rem',
});

const WelcomeTitle = styled(Title)(({ theme }) => ({
  ...theme.sqwTier2Typography.headingLg,
  [mq.isSmallDevice]: {
    ...theme.sqwTier2Typography.headingMd,
  },
}));

export const S = { ClockInPanelContainer, WelcomeTitle } as const;
