// @ts-check
import getId from '../../getId.js';

/**
 * @param  { Partial<import('../../../src/adapters/core/TabsAdapter/TabsAdapter.types').TabsBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/TabsAdapter/TabsAdapter.types').TabsBackendDefinition }
 */
function tabsFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfComponent: 'Tabs',
    props: { ...props },
    sfId,
    dataGuideId,
  };
}

/**
 * @param  { Partial<import('../../../src/adapters/core/TabsAdapter/TabsAdapter.types').TabsItemBackendProps> } props
 * @param  { string } sfId
 * @param {string} [dataGuideId]
 * @returns { import('../../../src/adapters/core/TabsAdapter/TabsAdapter.types').TabsItemBackendDefinition }
 */
function tabsItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return { sfId, props: { title: 'Tab-Title', componentChildren: [], ...props }, dataGuideId };
}

export { tabsFactory, tabsItemFactory };
