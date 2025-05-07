import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { log } from '../vite';

let mongoServer: MongoMemoryServer;

// Connect to MongoDB using mongodb-memory-server
export async function connectToDatabase() {
  try {
    // Create MongoDB Memory Server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    log(`Connecting to MongoDB Memory Server at ${mongoUri}`, 'mongodb');
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
    
    log('Connected to MongoDB Memory Server successfully!', 'mongodb');
    return true;
  } catch (error) {
    log(`Error connecting to MongoDB: ${error}`, 'mongodb');
    console.error('MongoDB connection error:', error);
    return false;
  }
}

// Graceful shutdown
export async function closeDatabaseConnection() {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
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