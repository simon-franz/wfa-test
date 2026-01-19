import { SqwClockInButton } from '@hrworks/sui-extension/SqwClockInButton';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ComponentMapper } from '../../../../main/components/ComponentMapper';
import { SmartFaceContext } from '../../../../main/components/SmartFaceContext';
import type { SqwClockInButtonAdapterProps } from './SqwClockInButtonAdapter.types';

export const SqwClockInButtonAdapter = observer(
  ({ projectOrActivityDropdown, onClockIn, onClockOut, ...otherProps }: SqwClockInButtonAdapterProps) => {
    const { applyEvents } = useContext(SmartFaceContext);

    const _projectOrActivityDropdown = projectOrActivityDropdown && (
      <ComponentMapper smartFaceComponent={projectOrActivityDropdown} />
    );
    const _onClockIn = onClockIn && (() => applyEvents(onClockIn));
    const _onClockOut = onClockOut && (() => applyEvents(onClockOut));

    return (
      <SqwClockInButton
        projectOrActivityDropdown={_projectOrActivityDropdown}
        onClockIn={_onClockIn}
        onClockOut={_onClockOut}
        {...otherProps}
      />
    );
  },
);
