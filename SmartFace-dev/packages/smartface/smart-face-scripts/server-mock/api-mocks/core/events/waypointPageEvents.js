import getId from '../../../../../shared/getId.js';
import { formTextFactory } from '../../../../../shared/smartFaceComponentFactories/core/formTextFactory.js';
import { listItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/listFactory.js';
import { textFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { waypointFactory } from '../../../../../shared/smartFaceComponentFactories/core/waypointFactory.js';
import { patchFactory } from '../../shared/patchFactory.js';

export default (body) => {
  const { targetId: id, pageEvent: event, customString } = body.backendEventData;
  const waypointId = id?.charAt(0) + id?.charAt(1);

  switch (event) {
    case 'waypoint-notification':
      return {
        sideEffects: [
          {
            type: 'addNotification',
            id: `notification-${getId()}`,
            stack: true,
            message: customString || '>>> Waypoint - Reached <<<',
            color: 'primary',
          },
        ],
      };

    case 'append-next-list-items':
      const numberOfItems = 20;
      let appendItems = [];

      for (let i = 0; i < numberOfItems; i++) {
        appendItems.push({
          targetSfId: `wp-list-${waypointId}`,
          operation: 'append',
          path: 'props.items',
          value: listItemFactory({
            componentChildren: [
              formTextFactory({
                label: `Lazy Loaded List Items - ${i + 1} Formtext Title`,
                value: `Lazy Loaded List Items - ${i + 1} Formtext Value`,
              }),
            ],
          }),
        });
      }

      return patchFactory([
        ...appendItems,
        {
          targetSfId: `wp-list-${waypointId}`,
          operation: 'append',
          path: 'props.items',
          value: listItemFactory({
            componentChildren: [
              textFactory({
                htmlTag: 'p',
                fontSize: 'extraLarge',
                color: 'warning',
                text: ' WAYPOINT - Next List Items Lazy Loaded',
              }),

              waypointFactory({
                rootMargin: '200px',
                onEnter: [
                  {
                    type: 'request',
                    data: {
                      action: 'waypoint-page',
                      targetId: '0',
                      pageEvent: 'append-next-list-items',
                    },
                  },
                ],
              }),
            ],
          }),
        },
      ]);

    default:
      return [];
  }
};
