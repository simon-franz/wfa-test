import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { ClockInMethodSelectorContext } from '../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { S } from './ClockInPanel.styles';
import type { ClockInPanelProps } from './ClockInPanel.types';
import { TimeQualificationPanel } from './TimeQualificationPanel';

export const ClockInPanel = (props: ClockInPanelProps) => {
  const t = useTranslations('clockInPanel');
  const { selectedUser } = useContext(ClockInMethodSelectorContext);

  const isOnlyUserIdEnabled = !selectedUser?.lastName;

  const userDisplayName =
    selectedUser && isOnlyUserIdEnabled ? selectedUser?.userId : `${selectedUser?.firstName} ${selectedUser?.lastName}`;

  return (
    <S.ClockInPanelContainer {...props}>
      <Grid>
        <GridItem>
          <S.WelcomeTitle alignTitle="center">{t('welcomeTitle', { userDisplayName })}</S.WelcomeTitle>
        </GridItem>
        <TimeQualificationPanel />
      </Grid>
    </S.ClockInPanelContainer>
  );
};
