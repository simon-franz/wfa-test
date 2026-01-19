// @ts-check

import getId from '../../getId.js';

/**
 * @param  { Partial<import('../../../src/adapters/core/CollapsibleMenuAdapter/CollapsibleMenuAdapter.types').CollapsibleMenuBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/CollapsibleMenuAdapter/CollapsibleMenuAdapter.types').CollapsibleMenuBackendDefinition }
 */
function collapsibleMenuFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponent: 'CollapsibleMenu',
    sfId,
    props: { ...props },
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/core/CollapsibleMenuAdapter/Section/CollapsibleMenuSectionAdapter.types').CollapsibleMenuSectionBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/CollapsibleMenuAdapter/Section/CollapsibleMenuSectionAdapter.types').CollapsibleMenuSectionBackendDefinition }
 */
function sectionFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Section',
    sfId,
    props: { title: 'Section', ...props },
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/core/CollapsibleMenuAdapter/Entry/CollapsibleMenuEntryAdapter.types').CollapsibleMenuEntryBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/CollapsibleMenuAdapter/Entry/CollapsibleMenuEntryAdapter.types').CollapsibleMenuEntryBackendDefinition }
 */
function entryFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponentPart: 'Entry',
    sfId,
    props: {
      text: 'Entry',
      ...(props.href && {
        onClick: [
          {
            type: 'request',
            data: {
              action: 'reflect',
              reflectedData: { sideEffects: [{ type: 'redirect', url: props.href }] },
            },
          },
        ],
      }),
      ...props,
    },
    dataGuideId,
  };
}

export { collapsibleMenuFactory, sectionFactory, entryFactory };
