const {MongoClient} = require('mongodb');
require('dotenv/config')

async function connectDB() {
	const uri = process.env.DB_CONNECTION;
	const client = new MongoClient(uri)
	try {
		client.connect()
	} catch(err) {
		console.error(err);
	}
}

async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function main(){
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */
	const uri = process.env.DB_CONNECTION;


	const client = new MongoClient(uri);

	try {
		// Connect to the MongoDB cluster
		await client.connect();

		// Make the appropriate DB calls
		await  listDatabases(client);
		console.log("\n  Inserting now.")
		const obj = {
			name: "Yeeters",
			biceps: true,
			triceratopsCount: 59
		}
		await client.db("test_db").collection("test_collection").insertOne(obj);

	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

module.exports = main;