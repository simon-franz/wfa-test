import { fileURLToPath } from 'bun';
import cors from 'cors';
import express from 'express';
import { dirname, join } from 'node:path';

export default async function serveBuildFolder() {
  const app = express();
  const buildFolderPath = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'build');
  app.use(cors());
  app.use('/', express.static(buildFolderPath));
  app.get('/{*path}', (_req, res) => res.sendFile(join(buildFolderPath, 'index.html')));
  app.listen(5000, () => console.log('Listening on port 5000'));
}
