require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];
const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
client.connect();

module.exports = async function (req,res) {
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found");}

    // Get reference of database and collection
    let db = await client.db(`qikvid-db`);
    let collection = await db.collection('users');

    if(req.query.userID){
        let user = await collection.findOne({_id: ObjectId(req.query.userID)});
        if(!user){
            res.status(400).send({errorName: "Bad Request", errorMessage: "No user found."});
        }else{
            //remove user password
            delete user.password;
            res.status(200).send(user);
        }
    }else if(req.query.username){
        let user = await collection.findOne({username: req.query.username});
        if(!user){
            res.status(400).send({errorName: "Bad Request", errorMessage: "No user found."});
        }else{
            //remove user password
            delete user.password;
            res.status(200).send(user);
        }
    }else{
        res.status(400).send({errorName: "Bad Request", errorMessage: "No user ID or username provided."});
    }
}