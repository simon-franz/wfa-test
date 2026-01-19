import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { keyDownSideEffectFactory } from '../../../../shared/smartFaceComponentFactories/core/keyDownSideEffectFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { sidebar } from '../shared/sidebar.js';

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const notificationPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Notifications Page' } },
        componentChildren: [
          keyDownSideEffectFactory({
            shortcut: { key: 'F2' },
            onKeyDown: [
              {
                type: 'request',
                data: { action: 'reflect', reflectedData: { sideEffects: [{ type: 'clearSideEffects' }] } },
              },
            ],
          }),
          classicLayoutFactory({
            sidebar: sidebar('notification-page', ['side-effect-pages']),
          }),
        ],
      },
      'page-0',
    ),
  ],

  sideEffects: [
    {
      type: 'addNotification',
      id: 'notification-0',
      message: 'This should be hidden',
    },
    // // Wird von erster Notification im Stack überschrieben
    // {
    //   type: 'addNotification',
    //   id: 'notification-11',
    //   title: 'NOT STACKED',
    //   message: 'Some Text.',
    //   color: 'primary',
    //   duration: 'infinite',
    // },
    {
      type: 'addNotification',
      id: 'notification-1',
      title: 'Gone in 1 Seconds',
      /* message: 'Some Text.', */
      stack: true,
      color: 'primary',
      duration: 'infinite',
    },
    {
      type: 'addNotification',
      id: 'notification-2',
      title: 'Gone in 2 Seconds',
      message: 'Some Text.',
      stack: true,
      color: 'primary',
      duration: 2200,
    },
    {
      type: 'addNotification',
      id: 'notification-3',
      title: 'Gone in 3 Seconds',
      message: 'Some Text.',
      stack: true,
      color: 'primary',
      duration: 3200,
    },
    {
      type: 'addNotification',
      id: 'notification-4',
      title: 'This is a Title for Primary',
      message: 'Some Text.',
      html: true,
      stack: true,
      color: 'primary',
      duration: 'infinite',
    },
    {
      type: 'addNotification',
      id: 'notification-5',
      title: 'This is a Title for Secondary - html true',
      message: 'Some <b>BOLD</b> Text.',
      html: true,
      stack: true,
      color: 'secondary',
      duration: 'infinite',
    },
    {
      type: 'addNotification',
      id: 'notification-6',
      title: 'This is a Title for Info - html false',
      message: 'Some <b>not so bold</b> Text.',
      html: false,
      stack: true,
      color: 'info',
      duration: 'infinite',
    },
    {
      type: 'addNotification',
      id: 'notification-7',
      title: 'This is a Title for Success',
      message: '<p>Press <b>"F2"</b> to clear all sideeffects. </br>Close to Trigger <b>new</b> Notification.</p>',
      html: true,
      color: 'success',
      duration: 'infinite',
      onDismiss: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: {
              sideEffects: [
                {
                  type: 'addNotification',
                  id: 'notification-8',
                  title: 'This is a Title for Warning',
                  message: 'Close to Trigger new Notification.',
                  color: 'warning',
                  duration: 'infinite',
                  onDismiss: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [
                            {
                              type: 'addNotification',
                              id: 'notification-9',
                              title: 'This is a Title for Danger',
                              message: 'No more Notification :C.',
                              color: 'danger',
                              duration: 'infinite',
                              // onDismiss: [
                              //   {
                              //     type: 'request',
                              //     data: {
                              //       action: 'reflect',
                              //       reflectedData: {
                              //         sideEffects: [
                              //           {
                              //             type: 'addNotification',
                              //             id: 'notification-10',
                              //             message: 'You dismissed a notification',
                              //             color: 'warning',
                              //           },
                              //         ],
                              //       },
                              //     },
                              //   },
                              // ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
    // // Überschreibt erste Notification im Stack
    // {
    //   type: 'addNotification',
    //   id: 'notification-11',
    //   title: 'NOT STACKED',
    //   message: 'Some Text.',
    //   color: 'primary',
    //   duration: 'infinite',
    // },
  ],
  // sideEffects: [
  //   {
  //     type: 'addNotification',
  //     id: 'notification-0',
  //     message: 'This should be hidden',
  //   },
  //   {
  //     type: 'addNotification',
  //     id: 'notification-1',
  //     title: 'Info',
  //     message: 'Press "F2" to clear all sideeffects',
  //     color: 'info',
  //     stack: true,
  //     duration: 'infinite',
  //   },
  //   {
  //     type: 'addNotification',
  //     id: 'notification-2',
  //     title: 'Stacking notification',
  //     message: 'This should <strong>stack</strong>',
  //     color: 'danger',
  //     html: true,
  //     stack: true,
  //     duration: 5000,
  //   },
  //   {
  //     type: 'addNotification',
  //     id: 'notification-3',
  //     message: 'Dismissing this should cause a new notification',
  //     duration: 'infinite',
  //     onDismiss: [
  //       {
  //         type: 'request',
  //         data: {
  //           action: 'reflect',
  //           reflectedData: {
  //             sideEffects: [
  //               {
  //                 type: 'addNotification',
  //                 id: 'notification-4',
  //                 message: 'You dismissed a notification',
  //                 color: 'warning',
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     ],
  //   },
  // ],
});
