import type { Express } from 'express';

import { jobportalSettings, posts } from './mock-data/applicant-management';
import { settings, users, workingTimesErrors, workingTimesResponses } from './mock-data/time-management';

export const endpoints = [
  { method: 'GET', path: '/applicant-management/posts' },
  { method: 'POST', path: '/authentication' },
  { method: 'POST', path: '/sso' },
];

export function registerAllRoutes(app: Express) {
  // Stellenportal
  app.get('/applicant-management/posts', (_req, res) => {
    res.json({ posts });
  });

  app.get('/applicant-management/jobportal-settings', (_req, res) => {
    res.json(jobportalSettings);
  });

  app.post('/applicant-management/applications', (req: any, res: any) => {
    const data = req.body.data[0];
    const errors = [];

    if (!data.serverTest || data.serverTest.trim() === '') {
      errors.push({
        errorCode: 8,
        errorMessage: 'Ey, yo! Geb irgendwas bei Server Test ein!',
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        additionalErrors: errors,
        type: 'ObjectCreationError',
        errorCode: 400,
        errorMessage: 'Something went wrong while creating the object: Check additionalErrors for more information.',
      });
    }

    return res.status(200).json({
      result: {},
    });
  });

  // Zeitkiosk
  app.get('/time-management/users', (_req, res) => {
    res.json({ users });
  });

  app.get('/time-management/settings', (_req, res) => {
    res.json({ settings });
  });

  app.post('/persons/working-times', (req: any, res: any) => {
    const data = req.body.data[0];
    const errors = [];
    console.log('data', data);

    if (!data) {
      errors.push(workingTimesErrors.invalidFormat);
    }

    if (errors.length > 0) {
      return res.status(400).json(workingTimesResponses.error);
    }

    return res.status(200).json(workingTimesResponses.success);
  });
}
