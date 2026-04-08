import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI_2;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI_2) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so the client is not 
  // recreated on every Hot Module Replacement (HMR).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper to get a specific collection
export const getCollection = async (collectionName) => {
  const dbClient = await clientPromise;
  return dbClient.db(process.env.DB_NAME).collection(collectionName);
};