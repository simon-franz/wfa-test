// @ts-check

import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';

/**
 * @template { import('../../../src/adapters/core/DropdownMenuAdapter/DropdownMenuAdapter.types.js').DropdownMenuBackendDefinition } DropdownMenuBackendDefinition
 * @param { DropdownMenuBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param {string} [dataGuideId]
 * @returns { DropdownMenuBackendDefinition }
 */
function dropdownMenuFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('DropdownMenu', props, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../src/adapters/core/DropdownMenuAdapter/Divider/DropdownMenuDividerAdapter.types.js').DropdownMenuDividerBackendDefinition['props']> } props
 * @param { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/DropdownMenuAdapter/Divider/DropdownMenuDividerAdapter.types.js').DropdownMenuDividerBackendDefinition }
 */
function dropdownMenuDividerFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Divider',
    sfId,
    props: { ...props },
    dataGuideId,
  };
}

/**
 * @param { import('../../../src/adapters/core/DropdownMenuAdapter/Entry/DropdownMenuEntryAdapter.types.js').DropdownMenuEntryBackendDefinition['props'] } props
 * @param { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/DropdownMenuAdapter/Entry/DropdownMenuEntryAdapter.types.js').DropdownMenuEntryBackendDefinition }
 */
function dropdownMenuEntryFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Entry',
    sfId,
    props: { text: 'Entry', ...props },
    dataGuideId,
  };
}

/**
 * @param { import('../../../src/adapters/core/DropdownMenuAdapter/Section/DropdownMenuSectionAdapter.types.js').DropdownMenuSectionBackendDefinition['props'] } props
 * @param { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/DropdownMenuAdapter/Section/DropdownMenuSectionAdapter.types.js').DropdownMenuSectionBackendDefinition }
 */
function dropdownMenuSectionFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Section',
    sfId,
    props: { title: 'Section', ...props },
    dataGuideId,
  };
}

export { dropdownMenuFactory, dropdownMenuDividerFactory, dropdownMenuEntryFactory, dropdownMenuSectionFactory };
