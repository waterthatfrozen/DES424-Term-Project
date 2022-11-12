const { DefaultAzureCredential } = require("@azure/identity");
const { AzureMediaServices, BuiltInStandardEncoderPreset, AssetContainerPermission, JobOutputAsset, JobInputUnion, JobsGetResponse } = require("@azure/arm-mediaservices");
const { BlobServiceClient, AnonymousCredential } = require("@azure/storage-blob");
const { AbortController } = require("@azure/abort-controller");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const url = require("whatwg-url");
const util = require("util");
const fs = require("fs");
const multipart = require("parse-multipart");
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config();

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.AZURE_RESOURCE_GROUP;
const accountName = process.env.AZURE_MEDIA_SERVICES_ACCOUNT_NAME;
const AZURE_COSMOSDB_CONNECTION_STRING = process.env.AZURE_COSMOSDB_CONNECTION_STRING;
const credential = new DefaultAzureCredential();
let mediaServicesClient = new AzureMediaServices(credential, subscriptionId);

module.exports = async function (req, res) {
    console.log('JavaScript HTTP trigger function processed a request.');
    console.log(req.query);

    const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
    await client.connect();
    let db = await client.db(`qikvid-db`);
    let collection = await db.collection(`videos`);
    let video = await collection.findOne({ _id: ObjectId(req.query.videoID), userID: req.query.userID });
    if (video == null) {
        res.status(400).send({ errorName: "Bad Request", errorMessage: "No video asset found." });
    } else {
        let outputAsset = video.assetName;
        let locatorName = video.locatorName;
        let inputAsset = outputAsset.substr(0,outputAsset.length-6)+"input";

        // Delete from CosmosDB
        await collection.deleteOne({ _id: ObjectId(req.query.videoID), userID: req.query.userID });

        // Delete the locator
        await mediaServicesClient.streamingLocators.delete(resourceGroup, accountName, locatorName, {
            abortSignal: AbortController.timeout(30*60*1000),
            onResponse: (_res) => {console.log("Delete streaming locator "+locatorName+" successfully");}
        }).catch(err => console.error("Failed to delete streaming locator "+locatorName));

        // Delete the output asset
        await mediaServicesClient.assets.delete(resourceGroup, accountName, outputAsset, {
            abortSignal: AbortController.timeout(30*60*1000),
            onResponse: (_res) => {console.log("Delete "+outputAsset+" successfully");}
        }).catch(err => console.error("Failed to delete asset "+outputAsset));

        // Delete the input asset
        await mediaServicesClient.assets.delete(resourceGroup, accountName, inputAsset,{
            abortSignal: AbortController.timeout(30*60*1000),
            onResponse: (_res) => {console.log("Delete "+inputAsset+" successfully");}
        }).catch(err => console.error("Failed to delete asset "+inputAsset));

        res.status(200).send({ message: "Video deleted successfully." });
    }
}