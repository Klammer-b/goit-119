import express from 'express';
import crypto from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './helper/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';

const app = express();

const generateRequestId = (req, res, next) => {
  req.id = crypto.randomUUID();
  next();
};

app.use(cors());
app.use(pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }));
app.use(generateRequestId);



app.get('/test/:testId', (req, res) => {
  res.json({ message: 'test', id: req.id, testId: req.params.testId });
});

app.get('/test-error', (req, res, next) => {
  const error = new Error('siufhuieqe');
  // next(error);
  throw error;
  // res.send('Hello world!' + req.id);
});

app.get('/', (req, res) => {
  res.send('Hello world!' + req.id);
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found!'
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});

const PORT = getEnvVar(ENV_VARS.PORT, 3000);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
