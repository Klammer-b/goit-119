import createHttpError from 'http-errors';
import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToLocal } from './saveFileToLocal.js';

export const saveFile = async (file) => {
  const saveFileStrategy = getEnvVar(ENV_VARS.SAVE_FILE_STRATEGY);

  if (saveFileStrategy === 'local') {
    return await saveFileToLocal(file);
  } else if (saveFileStrategy === 'cloudinary') {
    return await saveFileToCloudinary(file);
  }

  throw createHttpError(500, 'Unknown file saving strategy');
};
