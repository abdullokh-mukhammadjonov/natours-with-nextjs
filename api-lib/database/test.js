import { MongoClient } from 'mongodb'


export default async function database() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  const uri = process.env.MONGODB_URI

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }

  const client = new MongoClient(uri, options)
  client.on('open', _=> console.log('DB connected successfully(mongo)'))
  client.on('error', _=> console.log('Ooopppss. Could not connect to database'))
  client.on('topologyClosed', _=> console.log('DB has been disconnected'))

  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  return client.connect()
}
