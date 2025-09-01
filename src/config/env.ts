import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT || '3000',
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};

export default env;