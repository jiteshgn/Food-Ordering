import { MongoClient } from "mongodb"

if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

const uri = process.env.MONGO_URL
const options = {}

let client
let clientPromise: Promise<MongoClient>
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}
if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri)
  globalWithMongo._mongoClientPromise = client.connect()
}
clientPromise = globalWithMongo._mongoClientPromise

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  //Originally: global._mongoClientPromise below 3
  if (!clientPromise) {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
  clientPromise = clientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise