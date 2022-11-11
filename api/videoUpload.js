const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
require('dotenv').config()

const AZURE_STORAGE_CONNECTION_STRING = process.env["AZURE_STORAGE_CONNECTION_STRING"];
var multipart = require("parse-multipart");

async function upload(part) {
    // Get a reference to the video-container
        const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const container="video-container";
        const containerClient = await blobServiceClient.getContainerClient(container);

        // Upload a blob to the video-container
        const blobName = uuidv1() + part.filename;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(part.data, part.data.length);
}

module.exports = async function(req, res) {
    console.log("HELLO WORLD");
    if (!AZURE_STORAGE_CONNECTION_STRING) {throw Error("Azure Storage Connection string not found");}
    if (req.body) {

        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers["content-type"]);
        const parts = multipart.Parse(bodyBuffer, boundary);

        upload(parts[0])
        res.send((req.query.name || parts[0].filename || req.body.name) + " - Was uploaded successfully!");
    }
    else {
        res.status(400).send({message: "Please pass a name on the query string or in the request body"});
    }
};

