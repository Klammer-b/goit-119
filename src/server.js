import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './helper/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { setupLogger } from './middlewares/logger.js';
import { generateRequestId } from './middlewares/generateRequestIdMiddleware.js';
import router from './routes/index.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

export const startServer = () => {
  const app = express();

  app.use(
    cors(),
    cookieParser(),
    json({
      type: ['application/vnd.api+json', 'application/json'],
      limit: '100kb',
    }),
    setupLogger(),
    generateRequestId,
  );

  app.use(router);

  app.use(notFoundMiddleware);

  app.use(errors());

  app.use(errorHandlerMiddleware);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
