// @ts-check

import { textFactory } from '../../shared/smartFaceComponentFactories/core/textFactory.js';

/** @type {import('express').Handler}  */
export async function eventTestBackend(req, res) {
  const duration = req.body.backendEventData.duration || 2000;
  await new Promise((r) => setTimeout(r, duration));
  res.send({
    sideEffects: [
      {
        type: 'patch',
        updates: [
          {
            operation: 'append',
            targetSfId: req.body.backendEventData.sfId,
            path: 'props.bodyChildren',
            value: textFactory({ text: req.body.backendEventData.text }),
          },
        ],
      },
    ],
  });
}
