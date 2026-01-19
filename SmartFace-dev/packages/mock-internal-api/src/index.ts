import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { endpoints, registerAllRoutes } from './routes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // morgan is for logging for example when endpoints get called

registerAllRoutes(app);

app.get('/', (_req, res) => {
  res.json({
    message: 'Mock API Server',
    endpoints,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running at http://localhost:${PORT}`);
});

export default app;
