require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];
const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
client.connect();

module.exports = async function (req,res) {
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found");}

    // Get reference of database and collection
    let db = await client.db(`qikvid-db`);
    let collection = await db.collection('videos');

    // Get one random video
    let allVideos = await collection.find({}).toArray();
    let video = allVideos[Math.floor(Math.random()*allVideos.length)];
    res.status(200).send(video);
}