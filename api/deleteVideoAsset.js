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
require("dotenv").config();

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const resourceGroup = process.env.AZURE_RESOURCE_GROUP;
const accountName = process.env.AZURE_MEDIA_SERVICES_ACCOUNT_NAME;
const credential = new DefaultAzureCredential();
let mediaServicesClient = new AzureMediaServices(credential, subscriptionId);

module.exports = async function (req, res) {
    console.log('JavaScript HTTP trigger function processed a request.');
    console.log(req.query);
    const assetName = req.query.assetName;
    const locatorName = req.query.locatorName;
    let inputAsset, outputAsset;
    if(assetName.endsWith('output') || assetName.endsWith('input') || !locatorName){
        if(assetName.endsWith('output')){
            console.log('Output asset is given');
            outputAsset = assetName;
            inputAsset = assetName.substr(0,assetName.length-6)+"input";
        }
        else if(assetName.endsWith('input')){
            outputAsset = assetName.substr(0,assetName.length-5)+"output";
            inputAsset = assetName;
        }
        console.log("Input Asset: "+ inputAsset);
        console.log("Output Asset: "+outputAsset);
        try{
            await mediaServicesClient.streamingLocators.delete(resourceGroup, accountName, locatorName, {
                abortSignal: AbortController.timeout(30*60*1000),
                onResponse: (_res) => {console.log("Delete streaming locator "+locatorName+" successfully");}
            }).catch(err => console.error("Failed to delete streaming locator "+locatorName));
            await mediaServicesClient.assets.delete(resourceGroup, accountName, inputAsset,{
                abortSignal: AbortController.timeout(30*60*1000),
                onResponse: (_res) => {console.log("Delete "+inputAsset+" successfully");}
            }).catch(err => console.error("Failed to delete asset "+inputAsset));
            await mediaServicesClient.assets.delete(resourceGroup, accountName, outputAsset, {
                abortSignal: AbortController.timeout(30*60*1000),
                onResponse: (_res) => {console.log("Delete "+outputAsset+" successfully");}
            }).catch(err => console.error("Failed to delete asset "+outputAsset))
            res.send({message: "Delete asset "+assetName+" and its related asset successfully"});
        }catch (err){
            res.status(500).send({ errorName: err.name, errorMessage: err.message });
        }
    }else{
        res.status(400).send({ errorName: "Bad Request", errorMessage: "Given asset name must end with input or output only (assetName), or missing streaming locator name (streamingLocatorName)" });
    }
}