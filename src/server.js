import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { getEnvVar } from './helper/getEnvVar.js';
import { ENV_VARS } from './constants/envVars.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHendlerMiddleware.js';
import { setupLogger } from './middlewares/logger.js';
import { generateRequestId } from './middlewares/generateRequestIdMiddleware.js';
import router from './routes/index.js';

export const startServer = () => {
  const app = express();

  app.use(cors(), setupLogger(), generateRequestId);

  app.use(router);

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  const PORT = getEnvVar(ENV_VARS.PORT, 3000);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
