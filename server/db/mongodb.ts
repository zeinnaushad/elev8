import mongoose from 'mongoose';
import { log } from '../vite';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion_ecommerce';

// Connect to MongoDB
export async function connectToDatabase() {
  try {
    log(`Connecting to MongoDB at ${MONGODB_URI}`, 'mongodb');
    await mongoose.connect(MONGODB_URI);
    log('Connected to MongoDB successfully!', 'mongodb');
    return true;
  } catch (error) {
    log(`Error connecting to MongoDB: ${error}`, 'mongodb');
    console.error('MongoDB connection error:', error);
    return false;
  }
}

// Graceful shutdown
export function closeDatabaseConnection() {
  return mongoose.connection.close();
}

const db = mongoose.connection;
db.on('error', (err) => {
  log(`MongoDB connection error: ${err}`, 'mongodb');
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  log('MongoDB connection established', 'mongodb');
});

export default mongoose;