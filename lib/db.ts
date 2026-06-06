// lib/db.ts
import mongoose from 'mongoose';

// Read the connection string from your .env file
const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local or .env'
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // If connection exists, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is not already establishing, start one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disables mongoose buffering, fail fast if DB is down
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Successfully connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Error connecting to MongoDB', e);
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;