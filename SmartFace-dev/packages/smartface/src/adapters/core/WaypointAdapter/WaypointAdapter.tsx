import Waypoint from '@hrworks/sui-core/Waypoint';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { SmartFaceContext } from '../../../main/components/SmartFaceContext';
import type { WaypointAdapterProps } from './WaypointAdapter.types';

export const WaypointAdapter = observer(({ onEnter, onIntersection, onExit, ...otherProps }: WaypointAdapterProps) => {
  const { applyEvents } = useContext(SmartFaceContext);

  const _onEnter =
    onEnter &&
    (async () => {
      await applyEvents(onEnter);
    });

  const _onIntersection =
    onIntersection &&
    (async () => {
      await applyEvents(onIntersection);
    });

  const _onExit =
    onExit &&
    (() => {
      applyEvents(onExit);
    });

  return <Waypoint onEnter={_onEnter} onIntersection={_onIntersection} onExit={_onExit} {...otherProps} />;
});
