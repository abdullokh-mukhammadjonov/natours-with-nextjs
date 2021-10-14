import mongoose from 'mongoose'
import colors from 'colors'
// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! Shutting down...'.red.underline);
//   console.log(`err.name, err.message`.red.underline); // colors are more visual 
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM', () => {
//   console.log('SIGTERM RECEIVED. Shutting down gracefully'.red.underline);
//   server.close(() => {
//     console.log('Process terminated!'.red.underline);
//   });
// });

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.db_mongoose_promise

if (!cached) {
  cached = global.db_mongoose_promise = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {}

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(colors.green("Successfully connected to the database."))
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect