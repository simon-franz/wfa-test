// server.js - ES Module version
import express from 'express';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();

  // Parse JSON
  app.use(express.json());

  // API endpoint
  app.post('/api/update', async (req, res) => {
    const { backendEventData } = req.body;

    const { backendLoad, action, reflectedData } = backendEventData;
    if (backendLoad) {
      await new Promise((resolve) => setTimeout(resolve, backendLoad));
    }

    switch (action) {
      case 'reflect':
        return res.json(reflectedData);
      default:
        return res.json([]);
    }
  });

  // In development mode, create a Vite dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use Vite middleware
  app.use(vite.middlewares);

  const PORT = 5173; // Use Vite's default port
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

await createServer().catch((error) => {
  console.error('Error starting server:', error);
});
