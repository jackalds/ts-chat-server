import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  MONGO_URI: string;
  JWT_SECRET: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
};

export default config;
