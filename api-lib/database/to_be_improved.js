import mongoose from 'mongoose';
import tourSchema from 'api-lib/models/tourModel';
import userSchema from 'api-lib/models/userModel';


const URI = process.env.MONGODB_URI
const OPTIONS = {}


export const createConnection = () => {
    if (!URI) {
        throw new Error("'uri' is required.")
    }

    // If the node process ends, close the mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongo Database disconnected through app termination')
            process.exit(0)
        })
    })

    const connection = mongoose
        .createConnection(URI, OPTIONS, () => {
            console.log('MongoDB is connected. (using mongoose)')
        })

    connection.on('error', (error) => {
        console.error('MONGODB_ERROR')
    })

    userSchema(connection)
    tourSchema(connection)

    return connection
}



//// as middleware
export function databaseMongoose(req, res, next) {
  if (!URI) {
    throw new Error('URI is required. Please add your Mongo URI to .env.local')
  }

  let client
  let clientPromise


  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongooseClientPromise) {
      client = createConnection()
      global._mongooseClientPromise = client
    }
    clientPromise = global._mongooseClientPromise

  } else {
    // In production mode, it's best to not use a global variable.
    client = createConnection()
    clientPromise = client
  }

  req.dbClientm = clientPromise
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  return next()
}



//// as function
export function mongoosePromise() {
  if (!URI) {
    throw new Error('URI is required. Please add your Mongo URI to .env.local')
  }

  let client
  let clientPromise


  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongooseClientPromise) {
      client = createConnection()
      global._mongooseClientPromise = client
    }
    clientPromise = global._mongooseClientPromise

  } else {
    // In production mode, it's best to not use a global variable.
    client = createConnection()
    clientPromise = client
  }

  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  return clientPromise
}