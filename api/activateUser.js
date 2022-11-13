require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];
const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
client.connect();

module.exports = async function (req,res) {
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
    if (req.body.username !== "") {
        // Get reference of database and collection
        let db = await client.db(`qikvid-db`);
        let collection = await db.collection('users');

        // Check if username exists
        const foundUsername = await collection.findOne({ username: req.body.username });
        if(foundUsername == null) {
            res.status(400).send({message: "This user doesn't exist"});
        }
        else if (foundUsername.activated) {
            res.status(400).send({message: "This user is already activated."});
        }
        else {
            await collection.updateOne(
                { username: req.body.username },
                { $set: { 'activated': true } }
            )
            res.status(200).send({message: "The user " + req.body.username + " got enabled."});
        }
    }
    else {
        res.status(400).send({message: "Username is missing."});
    }
}