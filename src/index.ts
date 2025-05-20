import cors from 'cors';
import express from 'express';
import { readFile } from 'fs/promises';
import { pino } from 'pino';
import uploadRoutes from './upload/upload.routes.js';

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTION'],
  optionsSuccessStatus: 200,
};

const rootLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8')
);

const app = express();

app.use(cors(corsOptions));
app.use('/upload', uploadRoutes);

app.get('/health', (req, res) => {
  res.json({
    version: packageJson.version,
    status: 'up',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

app.get('/', (_, res) => {
  res.send('Arweave upload API is running 👋');
});

const server = app.listen(PORT, () => {
  rootLogger.info(`🚀 Server started at http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  rootLogger.info('Program received signal SIGINT, Interrupt');
  rootLogger.info('🛑 Shutting down gracefully...');
  server.close(() => {
    rootLogger.info('✅ Server closed.');
    process.exit(0);
  });
});
