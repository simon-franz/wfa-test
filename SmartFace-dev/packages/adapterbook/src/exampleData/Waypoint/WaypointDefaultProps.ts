import { addNotification } from '../../utils/eventFunctions/addNotification';
import type { WaypointBackendProps } from '@hrworks/smartface/adapters/core/WaypointAdapter/WaypointAdapter.types';

// Since nothing except the Waypoint is rendered, nothing is visible on the Example Page
// onEnter & onExit (and onIntersection) work, though
export const waypointDefaultProps: WaypointBackendProps = {
  repeatOnEnter: false,
  rootMargin: '-10',
  onEnter: [addNotification()],
  onExit: [addNotification()],
};
