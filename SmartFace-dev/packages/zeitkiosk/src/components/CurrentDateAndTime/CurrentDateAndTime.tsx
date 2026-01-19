'use client';

import { useMediaQuery } from '@hrworks/design-system';
import { useIsClient } from '@hrworks/sui-shared';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { S } from './CurrentDateAndTime.styles';
import type { CurrentDateAndTimeProps } from './CurrentDateAndTime.types';

export const CurrentDateAndTime = (props: CurrentDateAndTimeProps) => {
  const [currentDateAndTime, setCurrentDateAndTime] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const isLargeDevice = useMediaQuery('isLargeDevice');
  const isClient = useIsClient();

  const locale = useLocale();

  const localizedTimeSuffix = locale === 'de' && isLargeDevice ? 'Uhr' : null;

  useEffect(() => {
    const update = () => {
      if (isLargeDevice) {
        const currentDateTime = new Date()
          .toLocaleString(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          .replace(',', ' |');
        setCurrentDateAndTime(currentDateTime);
      } else {
        const currentDate = new Date().toLocaleDateString(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        setCurrentDate(currentDate);
      }
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [isLargeDevice, locale]);

  if (!isClient) {
    return;
  }

  return (
    <S.Container {...props}>
      {isLargeDevice ? currentDateAndTime : currentDate} {localizedTimeSuffix}
    </S.Container>
  );
};
