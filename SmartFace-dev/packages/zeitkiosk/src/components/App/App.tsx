'use client';

import { ClockInMethodSelector } from '../ClockInMethodSelector';
import { Header } from '../Header';
import { S } from './App.styles';
import type { AppProps } from './App.types';
import { AppContext } from './AppContext';

export const App = ({
  users,
  isCameraContinuous,
  isTimeTypeSelectionEnabled,
  isProjectBookingEnabled,
  ...otherProps
}: AppProps) => (
  <AppContext.Provider
    value={{
      users,
      isCameraContinuous,
      isTimeTypeSelectionEnabled,
      isProjectBookingEnabled,
    }}
  >
    <S.Scroller {...otherProps}>
      <Header />
      <ClockInMethodSelector />
    </S.Scroller>
  </AppContext.Provider>
);
