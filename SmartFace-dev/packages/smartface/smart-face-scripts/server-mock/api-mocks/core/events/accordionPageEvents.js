import getId from '../../../../../shared/getId.js';
import { accordionItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

let counter = 0;
let multiple = false;

export default (body) => {
  const { targetId: id, pageEvent: event, customString } = body.backendEventData;
  const accordionId = id?.charAt(0);
  const itemId = id?.charAt(1);

  switch (event) {
    case 'waypoint-notification':
      return {
        sideEffects: [
          {
            type: 'addNotification',
            id: `notification-${getId()}`,
            stack: true,
            message: customString || '>>> Waypoint - Triggert <<<',
            color: 'primary',
          },
        ],
      };
    case 'open':
      return patchFactory([
        {
          targetSfId: `accordion-${accordionId}`,
          operation: 'write',
          path: 'props.expandedItemSfIds',
          value: [`accordion-${accordionId}-item-${itemId}`],
        },
      ]);

    case 'append-single':
      return patchFactory([
        {
          targetSfId: `accordion-${accordionId}`,
          operation: 'append',
          path: 'props.items',
          value: accordionItemFactory(),
        },
      ]);

    case 'append-multiple':
      const numberOfItems = 2;
      let appendItems = [];

      for (let i = 0; i < numberOfItems; i++) {
        appendItems.push({
          targetSfId: `accordion-${accordionId}`,
          operation: 'append',
          path: 'props.items',
          value: accordionItemFactory(),
        });
      }

      const appendItemIds = appendItems.map((item) => {
        return item.value.sfId;
      });

      return patchFactory([
        ...appendItems,
        {
          targetSfId: `accordion-${accordionId}`,
          operation: 'write',
          path: 'props.expandedItemSfIds',
          value: appendItemIds,
        },
      ]);

    case 'collapse':
    case 'expand':
    case 'initial-expand':
      return patchFactory([
        {
          targetSfId: `accordion-${accordionId}-item-${itemId}`,
          operation: 'write',
          path: 'props.title',
          value: `${event} event: Accordion-${accordionId}-Item-${itemId}`,
        },
      ]);

    case 'counted-initial-expand':
      return patchFactory([
        {
          targetSfId: `accordion-${accordionId}-item-${itemId}`,
          operation: 'write',
          path: 'props.title',
          value: `Accordion item expansion counter: ${++counter} (initialExpand event)`,
        },
      ]);

    case 'counted-expand':
      return patchFactory([
        {
          targetSfId: `accordion-${accordionId}-item-${itemId}`,
          operation: 'write',
          path: 'props.title',
          value: `Accordion item expansion counter: ${++counter} (expand event)`,
        },
      ]);

    case 'toggle-multiple':
      multiple = !multiple;

      return patchFactory([
        { targetSfId: 'accordion-5', operation: 'write', path: 'props.multiple', value: multiple },
        {
          targetSfId: `accordion-${accordionId}-button-${itemId}`,
          operation: 'write',
          path: 'props.text',
          value: `Change multiple mode to ${!multiple}`,
        },
      ]);

    default:
      return [];
  }
};
