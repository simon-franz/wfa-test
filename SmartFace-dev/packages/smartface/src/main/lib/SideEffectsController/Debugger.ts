import type { SmartFaceContainer } from '../../../main/components/SmartFaceContainer';
import type { EnableComponentDebuggerType } from '../../../types/shared/BackendResponseType/SideEffectTypes/DebugTypes';

export class Debugger {
  sideEffectEvents?: EnableComponentDebuggerType['onClick'] | null;

  constructor(private smartFaceContainer: SmartFaceContainer) {}

  enableComponentDebugger = (sideEffect: EnableComponentDebuggerType) => {
    if (!this.sideEffectEvents) {
      document.addEventListener('click', this.sendSfId, { capture: true });
    }
    this.sideEffectEvents = sideEffect.onClick;
  };

  disableComponentDebugger = () => {
    document.removeEventListener('click', this.sendSfId, { capture: true });
    this.sideEffectEvents = null;
  };

  applyBackendEvents = (sfId: string | null) => {
    const { sideEffectEvents, smartFaceContainer } = this;
    if (!sideEffectEvents) {
      return;
    }

    const populatedSideEffectEvents: EnableComponentDebuggerType['onClick'] = Array.isArray(sideEffectEvents)
      ? sideEffectEvents.map((event) => ({
          ...event,
          frontendEventData: { targetSfId: sfId },
        }))
      : [{ ...sideEffectEvents, frontendEventData: { targetSfId: sfId } }];

    smartFaceContainer.eventController.applyEvents(populatedSideEffectEvents);
  };

  sendSfId = (event: MouseEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const target = event.target as HTMLElement;

    const closestId = (target.closest('[data-sfid]') as HTMLElement | null)?.dataset.sfid;
    this.applyBackendEvents(closestId == null ? null : closestId);
  };
}
