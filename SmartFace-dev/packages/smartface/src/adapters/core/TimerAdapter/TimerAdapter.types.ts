import type { SfEventType } from '@hrworks/types/shared/SfEventTypes';

import type { SmartFaceAdapterPropsType, SmartFaceBackendComponent } from '../../../types/SmartFaceComponent';

type TimerBackendProps = {
  tick: number;
  interval: boolean;
  onTimerIsUp?: SfEventType;
  intervalTick?: number;
};

export type TimerBackendDefinition = SmartFaceBackendComponent<'Timer', TimerBackendProps>;

export type TimerAdapterProps = SmartFaceAdapterPropsType<TimerBackendDefinition>;
