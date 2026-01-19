// @ts-check
import { existsSync, mkdtempSync, promises } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import getId from '../../../../shared/getId.js';

const tempPath = mkdtempSync(join(tmpdir(), 'sf-upload-'));

import multer from 'multer';

const upload = multer({ dest: tempPath });

export default function registerUploadHandler(app) {
  app.post('/api/sfFileUploadHandler', upload.any(), async (req, res) => {
    const fileManagerValues = req.files.reduce((acc, { fieldname, originalname, size }) => {
      const fileManagerSfId = fieldname.split('__')[2];
      const value = { sfId: getId(), displayName: `${originalname}`, size };
      if (acc[fileManagerSfId]) {
        acc[fileManagerSfId].push(value);
      } else {
        acc[fileManagerSfId] = [value];
      }

      return acc;
    }, {});

    res.send({ results: fileManagerValues });
  });

  app.get('/sfFileUploadHandler/:id', async (req, res) => {
    const { id } = req.params;
    const filePath = join(tempPath, id);
    if (existsSync(filePath)) {
      res.send(await promises.readFile(filePath));
    } else {
      res.statusCode = 404;
      res.send();
    }
  });
}
