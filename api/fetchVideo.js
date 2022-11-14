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

    if(req.query.videoID){
        let video = await collection.findOne({_id: ObjectId(req.query.videoID)});
        if(!video){
            res.status(400).send({errorName: "Bad Request", errorMessage: "No video asset found."});
        }else{
            // Add username
            const foundUser = await db.collection('users').findOne({ _id: ObjectId(video.userID) });
            video.username = foundUser.username;   
            res.status(200).send(video);
        }
    }else{
        // Get one random video
        let allVideos = await collection.find({}).toArray();
        let video = allVideos[Math.floor(Math.random()*allVideos.length)];   
        // Add username
        const foundUser = await db.collection('users').findOne({ _id: ObjectId(video.userID) });
        video.username = foundUser.username;
        res.status(200).send(video);
    }
}