// @ts-check
import getId from '../../getId.js';
import { smartFaceComponentFactory } from '../smartFaceComponentFactory.js';
import { fontAwesomeIconFactory } from './fontAwesomeIconFactory.js';
import { textFactory } from './textFactory.js';

/**
 * @template { import('../../../src/adapters/core/AccordionAdapter/AccordionAdapter.types').AccordionBackendDefinition } AccordionBackendDefinition
 * @param { AccordionBackendDefinition['props'] } props
 * @param { string } [sfId]
 * @param { string } [dataGuideId]
 * @returns { AccordionBackendDefinition }
 */
export function accordionFactory(props = {}, sfId, dataGuideId) {
  return smartFaceComponentFactory('Accordion', { ...props }, sfId, dataGuideId);
}

/**
 * @param { Partial<import('../../../src/adapters/core/AccordionAdapter/Item/AccordionItemAdapter.types').AccordionItemBackendProps> } props
 * @param { string } sfId
 * @param { string } [dataGuideId]
 * @returns { import('../../../src/adapters/core/AccordionAdapter/Item/AccordionItemAdapter.types').AccordionItemBackendDefinition }
 */
export function accordionItemFactory(props = {}, sfId = getId(), dataGuideId) {
  return {
    sfId,
    props: {
      icon: fontAwesomeIconFactory(),
      title: 'Accordion item',
      componentChildren: [textFactory({ text: 'Content' })],
      ...props,
    },
    dataGuideId,
  };
}
