import getId from '../../../shared/getId.js';
import { alertFactory } from '../../../shared/smartFaceComponentFactories/core/alertFactory.js';
import { audioSideEffectFactory } from '../../../shared/smartFaceComponentFactories/core/audioSideEffectFactory.js';
import { gridItemFactory } from '../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { portrayedListItemFactory } from '../../../shared/smartFaceComponentFactories/extension/portrayedListFactory.js';
import accordionPageEvents from './core/events/accordionPageEvents.js';
import { backendTimerPageEvents } from './core/events/backendTimerPageEvents.js';
import cmdTablePageEvents from './core/events/cmdTablePageEvents.js';
import formPageEvents from './core/events/formPageEvents.js';
import keyDownSideEffectPageEvents from './core/events/keyDownSideEffectPageEvents.js';
import loadingAnimationPageEvents from './core/events/loadingAnimationPageEvents.js';
import navigateToElementPageEvents from './core/events/navigateToElementPageEvents.js';
import nestedChecklistPageEvents from './core/events/nestedChecklistPageEvents.js';
import onboardingPageEvents from './core/events/onboardingPageEvents.js';
import tabsPageEvents from './core/events/tabsPageEvents.js';
import treeGraphPageEvents from './core/events/treeGraphPageEvents.js';
import waypointPageEvents from './core/events/waypointPageEvents.js';
import { patchFactory } from './shared/patchFactory.js';

/** @type {import('express').Handler}  */
export default async (req, res) => {
  const { backendLoad, pageEvent, eventId, action, reflectedData } = req.body.backendEventData;
  backendLoad && (await new Promise((resolve) => setTimeout(resolve, backendLoad)));
  switch (action) {
    case '404':
      res.statusCode = 404;
      res.send();
      break;
    case 'accordion-page':
      res.send(accordionPageEvents(req.body));
      break;
    case 'alert-close':
      res.send({
        sideEffects: [
          {
            type: 'addNotification',
            id: 'notification-1',
            message: 'Alert closed',
            color: 'danger',
          },
        ],
      });
      break;
    case 'backend-timer-page':
      res.send(await backendTimerPageEvents(req.body));
      break;
    case 'button-page':
      res.send(
        patchFactory([
          {
            targetSfId: 'breadCrumbItem-5',
            operation: 'write',
            path: 'props.text',
            value: 'This text has been changed',
          },
        ]),
      );
      break;
    case 'cmd-table-page':
      res.send(cmdTablePageEvents(req.body));
      break;
    case 'debug':
      res.send({
        sideEffects: [
          {
            type: 'removeNotification',
            id: 'debug-notification',
          },
          {
            type: 'addNotification',
            duration: 3000,
            message: `Component ${req.body.frontendEventData.targetSfId} clicked with eventId ${eventId}`,
            color: 'info',
          },
          {
            type: 'disableComponentDebugger',
          },
        ],
      });
      break;
    case 'delete-card':
      res.send(patchFactory([{ targetSfId: 'item-0', operation: 'delete', path: null }]));
      break;
    case 'play-sound':
      res.send(
        patchFactory([
          {
            operation: 'append',
            targetSfId: 'sound-grid-item',
            path: 'props.componentChildren',
            value: audioSideEffectFactory(
              {
                // src: 'https://actions.google.com/sounds/v1/human_voices/male_crying.ogg' // long
                // src: 'https://d9yw7530xbzu.cloudfront.net/assets/buzzer-featured.mp3',
                // src: 'https://d9yw7530xbzu.cloudfront.net/assets/buzzer.mp3',
                src: 'https://d9yw7530xbzu.cloudfront.net/assets/taratata.mp3',
                volume: 60,
              },
              'sound-0',
            ),
          },
        ]),
      );
      break;
    case 'replace-audio':
      res.send(
        patchFactory([
          {
            operation: 'write',
            targetSfId: 'sound-0',
            path: 'props.src',
            value: 'https://d9yw7530xbzu.cloudfront.net/assets/buzzer-featured.mp3',
          },
        ]),
      );
      break;
    case 'reset-sound':
      res.send(
        patchFactory([
          {
            operation: 'delete',
            targetSfId: 'sound-0',
          },
        ]),
      );
      break;
    case 'update-audio-volume':
      const sliderItem = req.body.backendPatches
        ?.flatMap((patch) => patch.updates)
        .find((update) => update.targetSfId === 'slider');

      res.send(
        sliderItem
          ? patchFactory([
              {
                operation: 'write',
                targetSfId: 'sound-0',
                path: 'props.volume',
                value: sliderItem.value,
              },
            ])
          : [],
      );
      break;
    case 'navigate-to-element':
      res.send(navigateToElementPageEvents(req.body));
      break;
    case 'form-page':
      res.send(formPageEvents(req.body));
      break;
    case 'key-down':
      const alertSfId = getId();
      res.send(
        patchFactory([
          {
            operation: 'prepend',
            targetSfId: 'grid-0',
            path: 'props.items',
            value: gridItemFactory(
              {
                componentChildren: [alertFactory({ text: 'Key Pressed!' })],
              },
              alertSfId,
            ),
          },
        ]),
      );
      break;

    case 'key-down-page':
      res.send(keyDownSideEffectPageEvents(req.body));
      break;
    case 'loading-animation-page':
      res.send(await loadingAnimationPageEvents(req.body));
      break;
    case 'on-value-change':
      res.send({
        sideEffects: [
          {
            type: 'javaScriptExecutor',
            javaScript: `function() { console.log("Component '${pageEvent}' changed") }`,
          },
        ],
      });
      break;
    case 'nested-checklist':
      res.send(nestedChecklistPageEvents(req.body));
      break;
    case 'tree-graph':
      res.send(treeGraphPageEvents(req.body));
      break;
    case 'onboarding-page':
      res.send(onboardingPageEvents(req.body));
      break;
    case 'page-load':
      res.send({
        sideEffects: [
          {
            type: 'addNotification',
            id: 'notification-2',
            message: 'Page loaded',
            color: 'primary',
          },
        ],
      });
      break;
    case 'portrayed-list-event-0':
      res.send(
        patchFactory([
          {
            targetSfId: 'event-item-id',
            operation: 'write',
            path: 'props.subtitle',
            value: 'Listitem clicked!',
          },
        ]),
      );
      break;
    case 'portrayed-list-event-1':
      res.send(
        patchFactory([
          {
            targetSfId: 'list-0',
            operation: 'append',
            path: 'props.items',
            value: portrayedListItemFactory(),
          },
        ]),
      );
      break;
    case 'portrayed-list-event-2':
      res.send(
        patchFactory([
          {
            targetSfId: 'list-0',
            operation: 'write',
            path: 'props.selectedItemSfId',
            value: 'secondListItem',
          },
          {
            targetSfId: 'secondListItem',
            operation: 'write',
            path: 'props.title',
            value: 'Selected!',
          },
        ]),
      );
      break;
    case 'modifyImage':
      res.send(
        patchFactory([
          {
            targetSfId: Object.values(req.body.backendEventData)[3],
            operation: 'write',
            path: Object.values(req.body.backendEventData)[1],
            value: Object.values(req.body.backendEventData)[2],
          },
        ]),
      );
      break;
    case 'reflect':
      res.send(reflectedData);
      break;
    case 'return-empty':
      res.send([]);
      break;
    case 'tabs-page':
      res.send(patchFactory(tabsPageEvents(req.body)));
      break;
    case 'timeout':
      break;
    case 'waypoint-page':
      res.send(waypointPageEvents(req.body));
      break;
    case 'log-response':
      console.log(req.body);
      res.send([]);
      break;
    default:
      res.send([]);
      break;
  }
};
