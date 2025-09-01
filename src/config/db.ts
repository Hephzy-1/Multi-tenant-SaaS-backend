import mongoose from 'mongoose';
import env from './env.ts';

if (!env.DB_URI) {
  throw Error('DB_URI is not defined in environment variables');
}

const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;