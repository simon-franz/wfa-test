// @ts-check

import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/PasswordFieldAdapter/PasswordFieldAdapter.types').PasswordFieldBackendDefinition } PasswordFieldBackendDefinition
 * @param { PasswordFieldBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { PasswordFieldBackendDefinition }
 */
export function passwordFieldFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory(
    'PasswordField',
    { label: 'Label', name: 'PasswordField', ...props },
    sfId,
    dataGuideId,
  );
}
