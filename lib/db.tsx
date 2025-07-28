import mongoose from 'mongoose';

export const connectdb = async () => {
  const uri = process.env.MONGODB;
  if (!uri) {
    throw new Error('MONGODB environment variable is not defined');
  }
  console.log('mongodb connected');
  return mongoose.connect(uri);
}