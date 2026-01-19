import { captureException } from '@sentry/nextjs';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getSecretValue } from './getSecretValue';

export const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const error = new Error('Authorization token required');
    captureException(error);

    return res.status(401).send({ error: error.message });
  }

  try {
    const secretName = '/smartface/services/treegraph/jwt';
    const secret = await getSecretValue(secretName);
    if (secret) {
      jwt.verify(token, secret, (error) => {
        if (error) {
          console.log(error.message);
          captureException(error);
          res.status(403).send({ error: error.message });
        }

        return;
      });
    }
  } catch {
    const error = new Error('Authorization failed. Probably an issue with the secret.');
    captureException(error);
    res.status(403).send({ error: error.message });
  }

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });

    return;
  }
};
