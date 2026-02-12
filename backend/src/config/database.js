import mongoose from 'mongoose';
import { exit } from 'process';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017',
      {
        dbName: 'task-board',
      }
    );

    console.info(
      `MongoDB is Connected\nPORT: Running in mongodb://localhost:27017\nDBNAME: ${conn.connection.name}
      `
    );
  } catch (error) {
    console.error('Database connection error:', error);
    exit(1);
  }
};

export default connectDB;
