import { MongoClient, Db, Collection } from "mongodb";

let db: Db | null = null;
let client: MongoClient | null = null;

async function connectToDatabase(): Promise<Db | null> {
	if (db) {
		return db;
	}

	const mongoUrl = process.env.MONGODB_URI || process.env.DATABASE_URL;

	if (!mongoUrl) {
		console.warn("MongoDB URL not configured. Using in-memory storage.");
		return null;
	}

	try {
		client = new MongoClient(mongoUrl);
		await client.connect();
		db = client.db("onestop");

		// Create collections if they don't exist
		const collections = await db.listCollections().toArray();
		const collectionNames = collections.map((c) => c.name);

		if (!collectionNames.includes("blogPosts")) {
			await db.createCollection("blogPosts");
			await db.collection("blogPosts").createIndex({ slug: 1 });
			await db.collection("blogPosts").createIndex({ published: 1 });
		}

		if (!collectionNames.includes("contactSubmissions")) {
			await db.createCollection("contactSubmissions");
			await db
				.collection("contactSubmissions")
				.createIndex({ createdAt: -1 });
		}

		console.log("Connected to MongoDB successfully");
		return db;
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		return null;
	}
}

// Initialize connection on server start
if (typeof window === "undefined") {
	connectToDatabase().catch(console.error);
}

export async function getDb(): Promise<Db | null> {
	if (!db) {
		return await connectToDatabase();
	}
	return db;
}

export { db };
