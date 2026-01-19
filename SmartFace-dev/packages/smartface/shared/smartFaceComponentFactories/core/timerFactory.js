// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/TimerAdapter/TimerAdapter.types.js').TimerBackendDefinition  } TimerBackendDefinition
 * @param { TimerBackendDefinition ['props'] } props
 * @param { string } [sfId]
 * @returns { TimerBackendDefinition  }
 */
export function timerFactory(props = {}, sfId) {
  return smartFaceComponentFactory('Timer', { ...props }, sfId);
}
