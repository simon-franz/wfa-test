import { badgeFactory } from '../../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { timerFactory } from '../../../../../shared/smartFaceComponentFactories/core/timerFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

let counter = 0;
let backendLoad = false;

export async function backendTimerPageEvents(body) {
  switch (body.backendEventData.pageEvent) {
    case 'startSingleTimer':
      return patchFactory([
        {
          operation: 'append',
          targetSfId: 'grid-item-1',
          path: 'props.componentChildren',
          value: badgeFactory({ text: 'timer', color: 'success' }, 'timerStatusBadge'),
        },
        {
          operation: 'write',
          targetSfId: 'timer-button',
          path: 'props.disabled',
          value: true,
        },
        {
          operation: 'write',
          targetSfId: 'deactivate-timer-button',
          path: 'props.disabled',
          value: false,
        },
        {
          operation: 'append',
          targetSfId: 'grid-item-1',
          path: 'props.componentChildren',
          value: timerFactory(
            {
              tick: 3000,
              onTimerIsUp: [
                {
                  type: 'request',
                  data: {
                    action: 'backend-timer-page',
                    pageEvent: 'singleTimer',
                  },
                },
              ],
            },
            'timer-single',
          ),
        },
      ]);

    case 'singleTimer': {
      if (backendLoad) await new Promise((resolve) => setTimeout(resolve, 4000));
      counter += 1;

      return patchFactory([
        { targetSfId: 'counterText', operation: 'write', path: 'props.text', value: counter },
        { targetSfId: 'timerStatusBadge', operation: 'delete' },
        { targetSfId: 'timer-button', operation: 'write', path: 'props.disabled', value: false },
        { targetSfId: 'deactivate-timer-button', operation: 'write', path: 'props.disabled', value: true },
      ]);
    }

    case 'stopSingleTimer':
      return patchFactory([
        {
          targetSfId: 'timerStatusBadge',
          operation: 'delete',
        },
        {
          targetSfId: 'timer-button',
          operation: 'write',
          path: 'props.disabled',
          value: false,
        },
        {
          targetSfId: 'deactivate-timer-button',
          operation: 'write',
          path: 'props.disabled',
          value: true,
        },
        {
          targetSfId: 'timer-single',
          operation: 'delete',
        },
      ]);

    case 'startIntervalTimer':
      return patchFactory([
        {
          operation: 'append',
          targetSfId: 'grid-item-1',
          path: 'props.componentChildren',
          value: badgeFactory({ text: 'interval timer', color: 'success' }, 'intervalTimerStatusBadge'),
        },
        {
          operation: 'write',
          targetSfId: 'interval-timer-button',
          path: 'props.disabled',
          value: true,
        },
        {
          operation: 'write',
          targetSfId: 'deactivate-interval-timer-button',
          path: 'props.disabled',
          value: false,
        },
        {
          operation: 'append',
          targetSfId: 'grid-item-1',
          path: 'props.componentChildren',
          value: timerFactory(
            {
              tick: 3000,
              intervalTick: 3000,
              interval: true,
              onTimerIsUp: [
                {
                  type: 'request',
                  data: {
                    action: 'backend-timer-page',
                    pageEvent: 'intervalTimer',
                  },
                  childEvents: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [{ type: 'consoleMessage', message: 'Ping' }],
                        },
                      },
                    },
                  ],
                },
              ],
            },
            'timer-interval',
          ),
        },
      ]);

    case 'intervalTimer': {
      if (backendLoad) await new Promise((resolve) => setTimeout(resolve, 3000));
      counter += 1;

      return patchFactory([{ targetSfId: 'counterText', operation: 'write', path: 'props.text', value: counter }]);
    }

    case 'testCase1':
      return patchFactory([
        {
          operation: 'append',
          targetSfId: 'grid-item-1',
          path: 'props.componentChildren',
          value: badgeFactory({ text: 'interval timer', color: 'success' }, 'intervalTimerStatusBadge'),
        },
        {
          operation: 'append',
          targetSfId: 'grid-item-1',
          path: 'props.componentChildren',
          value: timerFactory(
            {
              tick: 3000,
              intervalTick: 3000,
              interval: true,
              onTimerIsUp: [
                {
                  type: 'request',
                  data: {
                    action: 'backend-timer-page',
                    pageEvent: 'stopIntervalTimerTestCase',
                  },
                },
              ],
            },
            'timer-interval-test',
          ),
        },
      ]);

    case 'stopIntervalTimerTestCase':
      if (backendLoad) await new Promise((resolve) => setTimeout(resolve, 4000));
      counter += 1;

      return patchFactory([
        { targetSfId: 'counterText', operation: 'write', path: 'props.text', value: counter },
        {
          targetSfId: 'intervalTimerStatusBadge',
          operation: 'delete',
        },
        {
          targetSfId: 'timer-interval-test',
          operation: 'delete',
        },
      ]);

    case 'stopIntervalTimer':
      return patchFactory([
        {
          targetSfId: 'intervalTimerStatusBadge',
          operation: 'delete',
        },
        {
          targetSfId: 'interval-timer-button',
          operation: 'write',
          path: 'props.disabled',
          value: false,
        },
        {
          targetSfId: 'deactivate-interval-timer-button',
          operation: 'write',
          path: 'props.disabled',
          value: true,
        },
        {
          targetSfId: 'timer-interval',
          operation: 'delete',
        },
      ]);

    case 'activateBackendLoad': {
      backendLoad = true;

      return patchFactory([
        { targetSfId: 'backendLoadBadge', operation: 'write', path: 'props.text', value: 'active' },
        { targetSfId: 'backendLoadBadge', operation: 'write', path: 'props.variant', value: 'success' },
        { targetSfId: 'backendload-button', operation: 'write', path: 'props.disabled', value: true },
        { targetSfId: 'deactivate-backendload-button', operation: 'write', path: 'props.disabled', value: false },
      ]);
    }

    case 'deactivateBackendLoad': {
      backendLoad = false;

      return patchFactory([
        { targetSfId: 'backendLoadBadge', operation: 'write', path: 'props.text', value: 'off' },
        { targetSfId: 'backendLoadBadge', operation: 'write', path: 'props.variant', value: 'secondary' },
        { targetSfId: 'backendload-button', operation: 'write', path: 'props.disabled', value: false },
        { targetSfId: 'deactivate-backendload-button', operation: 'write', path: 'props.disabled', value: true },
      ]);
    }
    case 'updateSfEvent':
      return patchFactory([
        {
          operation: 'write',
          targetSfId: 'timer-interval',
          path: 'props.onTimerIsUp',
          value: [
            {
              type: 'request',
              data: {
                action: 'reflect',
                reflectedData: {
                  sideEffects: [{ type: 'consoleMessage', message: 'sfEvent was updated!' }],
                },
              },
            },
          ],
        },
      ]);
    default:
      return {};
  }
}
