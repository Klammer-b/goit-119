import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_DIR } from '../constants/path.js';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

export const saveFileToLocal = async (file) => {
  const newAddress = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(file.path, newAddress);

  return `${getEnvVar(ENV_VARS.BACKEND_DOMAIN)}/files/${file.filename}`;
};
