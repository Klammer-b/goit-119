import mongoose from 'mongoose';
import { getEnvVar } from '../helper/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

export const connectToMongoDb = async () => {
  try {
    const user = getEnvVar(ENV_VARS.DB_USER);
    const password = getEnvVar(ENV_VARS.DB_PASSWORD);
    const host = getEnvVar(ENV_VARS.DB_HOST);
    const dbName = getEnvVar(ENV_VARS.DB_NAME);
    const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?appName=Cluster0`;

    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error('Error connecting to mongoDB', err.message);
    process.exit(1);
  }
};
