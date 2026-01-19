import type { SfEventType } from '../../../types/shared/SfEventTypes';
import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

export type WaypointBackendProps = {
  onEnter: SfEventType;
  onIntersection?: SfEventType;
  onExit?: SfEventType;
  rootMargin?: string;
  repeatOnEnter?: boolean;
};

export type WaypointBackendDefinition = SmartFaceBackendComponent<'Waypoint', WaypointBackendProps>;

export type WaypointAdapterProps = SmartFaceAdapterPropsType<WaypointBackendDefinition>;
