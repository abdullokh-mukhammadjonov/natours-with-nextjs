import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global.db_mongodb_promise) {
    client = new MongoClient(uri, options)
    client.on('open', _=> console.log('DB connected successfully'))
    client.on('topologyClosed', _=> console.log('DB has been disconnected'))
    global.db_mongodb_promise = client.connect()
  }
  clientPromise = global.db_mongodb_promise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  client.on('open', _=> console.log('DB connected successfully'))
  client.on('topologyClosed', _=> console.log('DB has been disconnected'))
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

export default clientPromise




// as a middleware

// import { MongoClient } from 'mongodb'


// export default async function database(req, res, next) {
//   if (!process.env.MONGODB_URI) {
//     throw new Error('Please add your Mongo URI to .env.local')
//   }

//   const uri = process.env.MONGODB_URI

//   const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   }

//   let client
//   let clientPromise


//   if (process.env.NODE_ENV === 'development') {
//     // In development mode, use a global variable so that the value
//     // is preserved across module reloads caused by HMR (Hot Module Replacement).
//     if (!global.db_mongodb_promise) {
//       client = new MongoClient(uri, options)
//       client.on('open', _=> console.log('DB connected successfully(mongo)'))
//       client.on('topologyClosed', _=> console.log('DB has been disconnected'))
//       global.db_mongodb_promise = client.connect()
//     }
//     clientPromise = global.db_mongodb_promise
//   } else {
//     // In production mode, it's best to not use a global variable.
//     client = new MongoClient(uri, options)
//     client.on('open', _=> console.log('DB connected successfully(mongo)'))
//     client.on('topologyClosed', _=> console.log('DB has been disconnected'))
//     clientPromise = client.connect()
//   }

//   req.dbClient = clientPromise

//   // Export a module-scoped MongoClient promise. By doing this in a
//   // separate module, the client can be shared across functions.
//   return next()
// }


///  usage
// import dbConnect from 'api-lib/database/db_mongo';

// export default async (req, res) => {
//   const client = await dbConnect
//   const movies = await client.db('natours')
//     .collection("tours")
//     .find({_id: '5c88fa8cf4afda39709c295a'})
//     // .sort({ metacritic: -1 })
//     // .limit(20)
//     // .toArray();
//   res.json(movies);
// }