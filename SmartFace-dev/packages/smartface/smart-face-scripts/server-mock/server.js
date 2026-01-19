import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import comboBoxBackend from './api-mocks/comboBoxBackend/comboBoxBackend.js';
import dataGridBackend from './api-mocks/dataGridBackend/dataGridBackend.js';
import fileExport from './api-mocks/fileExport.js';
import handleUpdate from './api-mocks/update.js';
import registerUploadHandler from './api-mocks/uploadBackend/uploadBackend.js';
import { eventTestBackend } from './eventTestBackend.js';
import { router } from './router.js';

const ABOUT = 'SmartFace Mock API running';

async function startMockServer() {
  const port = 4000;
  const baseUrl = `http://localhost:${port}`;
  /** @type {import('axios').AxiosResponse<string>}  */
  let response;
  try {
    response = await axios.get(`${baseUrl}/about`);
  } catch {
    /* empty */
  }

  if (!response || (response.status !== 200 && response.data !== ABOUT)) {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json({ limit: '5mb' }));

    app.get('/about', (req, res) => res.send(ABOUT));
    app.post('/api/sfHistoryHandler', async (req, res) => {
      const targetUrl = req.body.targetUrl;
      req.params.route = targetUrl.slice(-(targetUrl.length - 1));
      router(req, res);
    });
    app.post('/api/update', handleUpdate);
    app.post('/api/combo-box-backend', comboBoxBackend);
    app.post('/api/file-export', fileExport);
    app.post('/api/data-grid-backend', dataGridBackend);
    registerUploadHandler(app);
    app.post('/api/event-test-backend', eventTestBackend);
    app.post(['/api/', '/api/:route'], router);
    app.post('/error', (req, res) => {
      console.log(req.body);
      res.send();
    });

    app.listen(port, () => {
      console.log(`API listening at ${baseUrl}`);
    });
  } else {
    console.log('Mock API already running');
  }
}

await startMockServer();
