import mongoose from 'mongoose';
/* import { connectToDB } from '@utils/database'} -> paste this string to use the database in other files */

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DB_NAME,
    });

    isConnected = true;

    console.log('MongoDb connected');
  } catch (error) {
    console.log(error);
    console.log('not connected');
  }
};
