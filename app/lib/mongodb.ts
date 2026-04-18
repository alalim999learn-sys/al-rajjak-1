//C:\Users\Shanon\al-rajjak-1\app\lib\mongodb.ts



import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// SSL এবং কানেকশন জট কাটানোর জন্য অপশনস আপডেট করা হয়েছে
const options: MongoClientOptions = {
  tls: true,
  tlsAllowInvalidCertificates: true, // এটি আপনার লোকাল পিসির SSL সমস্যা সমাধান করবে
  connectTimeoutMS: 10000,           // ১০ সেকেন্ডের বেশি সময় নিলে এরর দিবে (ঝুলে থাকবে না)
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}


export default clientPromise;