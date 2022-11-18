require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];

module.exports = async (req, res) => {
    if(req.query.userID !== "" && req.query.userID !== undefined){
        try {
            console.log("List user video function is called");   
            if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found");}
            const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
            client.connect();
            const db = client.db(`qikvid-db`);
            let userCollection = db.collection('users');
            let userQueryResult = await userCollection.findOne({ _id: ObjectId(req.query.userID) });
            if(userQueryResult == null){
                res.status(400).send({message: "User not found"});
            } else {
                let videoCollection = db.collection('videos');
                let query = { userID: req.query.userID };
                let result = await videoCollection.find(query).sort({timestamp: -1}).toArray();
                res.status(200).send({message: "List user video successfully" ,videos: result, totalVideos: result.length});
            }
        } catch (error) {
            res.status(500).send({message: "Error while listing user video", error: error});
        }
    } else {
        res.status(400).send({message: "Please input userID."});
    }
};