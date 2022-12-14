require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];
const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
client.connect();

module.exports = async function (req,res) {
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found.");}
    if (req.body.username !== "" && req.body.password !== "") {
        // Get reference of database and collection
        let db = await client.db(`qikvid-db`);
        let collection = await db.collection('users');

        // Check if username exists
        const foundUsername = await collection.findOne({ username: req.body.username });
        if(foundUsername == null) {
            res.status(400).send({message: "This user doesn't exist"});
        }
        else if (!foundUsername.activated) {
            res.status(400).send({message: "This user is disabled."});
        }
        else{
            if(foundUsername.password == req.body.password){
                // Login
                res.status(200).send({message: "Login was successfull.", userID: foundUsername._id, userLevel: foundUsername.userLevel});
            } else {
                res.status(400).send({message: "Username and password don't match."});
            }
        }
    } else {
        res.status(400).send({message: "Username and/or password are missing."});
    }
}