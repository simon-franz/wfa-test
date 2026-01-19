// @ts-check

import getId from '../../../getId.js';
import { smartFaceComponentFactory } from '../../smartFaceComponentFactory.js';

/**
 * @template { import('../../../../src/adapters/application/hrworks-user/SqwDropdownMenuAdapter/SqwDropdownMenuAdapter.types.js').SqwDropdownMenuBackendDefinition } SqwDropdownMenuBackendDefinition
 * @param { SqwDropdownMenuBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { SqwDropdownMenuBackendDefinition }
 */
function sqwDropdownMenuFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('SqwDropdownMenu', { ...props }, sfId, dataGuideId);
}

/**
 * @param { import('../../../../src/adapters/application/hrworks-user/SqwDropdownMenuAdapter/DropdownMenuEntryAdapter/DropdownMenuEntryAdapter.types.js').DropdownMenuEntryBackendDefinition['props'] } props
 * @param { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../../src/adapters/application/hrworks-user/SqwDropdownMenuAdapter/DropdownMenuEntryAdapter/DropdownMenuEntryAdapter.types.js').DropdownMenuEntryBackendDefinition }
 */
function dropdownMenuEntryFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Entry',
    sfId,
    props: { text: 'Entry', ...props },
    dataGuideId,
  };
}

export { sqwDropdownMenuFactory, dropdownMenuEntryFactory };
