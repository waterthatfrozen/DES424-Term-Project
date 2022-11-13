require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];
const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
client.connect();

module.exports = async function (req,res) {
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found");}
    if (req.body.userID !== "" && req.body.videoID !== "") {
        // Get reference of database and collection
        let db = await client.db(`qikvid-db`);
        let collection = await db.collection('videos');

        // Check if video exists
        const foundVideo = await collection.findOne({ _id: ObjectId(req.body.videoID) });
        if (foundVideo == null) {
            res.status(400).send({message: "The video tried to like doesn't exist."});
        }
        else {
            if(foundVideo.likedBy.includes(req.body.userID)) {
                // Remove userID from likedBy array
                const index = foundVideo.likedBy.indexOf(req.body.userID);
                if (index > -1) { foundVideo.likedBy.splice(index, 1); }
                await collection.updateOne(
                    { _id: ObjectId(req.body.videoID) },
                    { $set: { 'likedBy': foundVideo.likedBy } }
                )
                res.status(200).send({message: "The video was unliked."});
            }
            else {
                // Add userID to likedBy array
                foundVideo.likedBy.push(req.body.userID);
                await collection.updateOne(
                    { _id: ObjectId(req.body.videoID) },
                    { $set: { 'likedBy': foundVideo.likedBy } }
                )
                res.status(200).send({message: "The video was liked."});
            }
        }
    }
    else {
        res.status(400).send({message: "userID and videoID are not defined."});
    }
}