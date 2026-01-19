import { observer } from 'mobx-react';
import { useMemo } from 'react';

import type { DateDataProps } from './DateData.types';

export const DateData = observer(({ value, ...otherProps }: DateDataProps) => {
  const formattedDate = useMemo<string | null>(() => {
    if (typeof value !== 'string') {
      return null;
    }
    const [year, month, day] = value.split('-');

    return `${day}.${month}.${year}`;
  }, [value]);

  return <div {...otherProps}>{formattedDate}</div>;
});
