const { DefaultAzureCredential } = require("@azure/identity");
const { AzureMediaServices } = require("@azure/arm-mediaservices");
require('dotenv').config();

module.exports = async function (req,res) {

    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
    const resourceGroup = process.env.AZURE_RESOURCE_GROUP;
    const accountName = process.env.AZURE_MEDIA_SERVICES_ACCOUNT_NAME;

    const credential = new DefaultAzureCredential();
    let mediaServicesClient =  new AzureMediaServices(credential, subscriptionId);
    let assetName;
    let locatorName;
    let streamingPath;
    let results = [];

    try{
        for await (const locator of mediaServicesClient.streamingLocators.list(resourceGroup, accountName)){
            locatorName = locator.name;
            assetName = locator.assetName;
            let streamingPaths = await mediaServicesClient.streamingLocators.listPaths(resourceGroup, accountName, locatorName);
            console.log(locator);
            streamingPaths = streamingPaths.streamingPaths.filter((path) => path.streamingProtocol === "SmoothStreaming");
            if(streamingPaths){
                streamingPath = streamingPaths[0].paths[0];
                results.push({
                    assetName: assetName, 
                    locatorName: locatorName, 
                    streamingPath: streamingPath,
                    ampTestUrl: "http://ampdemo.azureedge.net/?url=https://quickvid-aaea.streaming.media.azure.net"+streamingPath
                });
            }
        }
        res.send({ streamingPaths: results });
    }catch(err){
        console.error("Error "+err.code+": ",err);
        res.status(500).send({ errorName:err.name, errorMessage: err.message });
    }
}