const factory = require('./transformFactory');
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
const azureStorageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const credential = new DefaultAzureCredential();
const timeoutSeconds = 60 * 10;
const sleepInterval = 1000 * 2;
const setTimeoutPromise = util.promisify(setTimeout);
const outputFolder = "./Temp";
const namePrefix = "stream";
let blobName, fileExtension;
let inputFile;
let mediaServicesClient = new AzureMediaServices(credential, subscriptionId);
let fileName, fileType;

async function createInputAsset(assetName, fileToUpload){
    let uploadSasUrl;
    let asset = await mediaServicesClient.assets.createOrUpdate(resourceGroup, accountName, assetName, {});
    let date = new Date();
    let readWritePermission = "ReadWrite";
    date.setHours(date.getHours() + 1);
    let input = {
        permissions: readWritePermission,
        expiryTime: date
    };
    let listContainerSas = await mediaServicesClient.assets.listContainerSas(resourceGroup, accountName, assetName, input);
    if(listContainerSas.assetContainerSasUrls){
        uploadSasUrl = listContainerSas.assetContainerSasUrls[0];
        const anonymousCredential = new AnonymousCredential();
        let blobClient = new BlobServiceClient(uploadSasUrl, anonymousCredential);
        console.log('Uploading file named '+fileName+' to blob in the asset container');
        let containerClient = blobClient.getContainerClient('');
        let blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(fileToUpload.data, {
            abortSignal: AbortController.timeout(30 * 60 * 1000),
            blobHTTPHeaders: { blobContentType: fileType },
            blockSize: 4 * 1024 * 1024,
            concurrency: 20,
            // onProgress: (ev) => { console.log(ev); }
        });
    }
    return asset;
}

async function getJobInputType(uniqueness){
    let assetName = `${namePrefix}-${fileName}-${uniqueness}-input`;
    await createInputAsset(assetName, inputFile);
    return factory.createJobInputAsset({
        assetName: assetName
    });
}

async function submitJob(transformName, jobName, jobInput, outputAssetName){
    if(outputAssetName == undefined){
        throw new Error("OutputAssetName is not defined");
    }
    let jobOutputs = [
        factory.createJobOutputAsset({
            assetName: outputAssetName
        })
    ];
    let createdJobs = await mediaServicesClient.jobs.create(resourceGroup, accountName, transformName, jobName, {
        input: jobInput,
        outputs: jobOutputs
    });
    return createdJobs;
}

async function createStreamingLocator(assetName, locatorName){
    let streamingLocator = {
        assetName: assetName,
        streamingPolicyName: "Predefined_ClearStreamingOnly"
    };
    let locator = await mediaServicesClient.streamingLocators.create(resourceGroup, accountName, locatorName, streamingLocator);
    return locator;
}

async function getStreamingUrls(locatorName){
    let streamingEndpoint = await mediaServicesClient.streamingEndpoints.get(resourceGroup, accountName, "default");
    let paths = await mediaServicesClient.streamingLocators.listPaths(resourceGroup, accountName, locatorName);
    let streamingPaths = paths.streamingPaths.filter((path) => path.streamingProtocol === "SmoothStreaming");
    if(streamingPaths){
        let streamingPath = streamingPaths[0].paths[0];
        let manifestPath = "https://" + streamingEndpoint.hostName + streamingPath;
        console.log(manifestPath);
        console.log(`Click to playback in AMP player: http://ampdemo.azureedge.net/?url=${manifestPath}`);
        return manifestPath;
    }else{ return null; }
}

async function downloadResults(assetName, resultsFolder){
    let date = new Date();
    let readPermission = "Read";
    date.setHours(date.getHours() + 1);
    let input = { permissions: readPermission, expiryTime: date }
    let listContainerSas = await mediaServicesClient.assets.listContainerSas(resourceGroup, accountName, assetName, input);
    if (listContainerSas.assetContainerSasUrls) {
        let containerSasUrl = listContainerSas.assetContainerSasUrls[0];
        let sasUri = url.parseURL(containerSasUrl);
        const anonymousCredential = new AnonymousCredential();
        let blobClient = new BlobServiceClient(containerSasUrl, anonymousCredential);
        let containerName = sasUri.path[0];
        let directory = path.join(resultsFolder, assetName);
        console.log(`Downloading output into ${directory}`);
        let containerClient = blobClient.getContainerClient('');
        try {
            fs.mkdirSync(directory, { recursive: true });
        } catch (err) {
            console.error(err);
        }
        console.log(`Listing blobs in container ${containerName}...`);
        console.log("Downloading blobs to local directory in background...");
        let i = 1;
        for await (const blob of containerClient.listBlobsFlat({includeMetadata:true})) {
            console.log(`Blob ${i++}: ${blob.name}`);
            let blockBlobClient = containerClient.getBlockBlobClient(blob.name);
            await blockBlobClient.downloadToFile(path.join(directory, blob.name), 0, undefined, {
                abortSignal: AbortController.timeout(30 * 60 * 1000),
                maxRetryRequests: 2,
                onProgress: (ev) => {console.log(ev)}
            }).then(() => {
                console.log(`Download file complete`);
            });
        }
    }
}

async function waitForJobToFinish(transformName, jobName) {
  let timeout = new Date();
  timeout.setSeconds(timeout.getSeconds() + timeoutSeconds);

  async function pollForJobStatus(){
        let job = await mediaServicesClient.jobs.get(resourceGroup, accountName, transformName, jobName);
        console.log(job.state);
        if (job.state == 'Finished' || job.state == 'Error' || job.state == 'Canceled') {
            return job;
        } else if (new Date() > timeout) {
            console.log(`Job ${job.name} timed out. Please retry or check the source file.`);
            return job;
        } else {
            await setTimeoutPromise(sleepInterval, null);
            return pollForJobStatus();
        }
  }
  return pollForJobStatus();
}

module.exports = async function (req, res) {
    if(req.body){
        try{
            console.log('JavaScript HTTP trigger function processed a request.');
            const bodyBuffer = Buffer.from(req.body);
            console.log(req.body);
            const boundary = multipart.getBoundary(req.headers["content-type"]);
            const parts = multipart.Parse(bodyBuffer, boundary);
            inputFile = parts[0];
            fileName = inputFile.filename;
            fileType = inputFile.type;
            console.log(inputFile);

            const encodingTransformName = "ContentAwareEncoding";
            console.log("Creating encoding transform...");
            let adaptiveStreamingTransform = factory.createBuiltInStandardEncoderPreset({presetName: "ContentAwareEncoding"});
            let encodingTransform = await mediaServicesClient.transforms.createOrUpdate(resourceGroup, accountName, encodingTransformName, {
                name: encodingTransformName,
                outputs: [{preset: adaptiveStreamingTransform}]
            })
            console.log("Transform Created");

            let uniqueness = uuidv4();
            let input = await getJobInputType(uniqueness);
            let outputAssetName = `${namePrefix}-${fileName}-${uniqueness}-output`;
            let jobName = `${namePrefix}-job-${uniqueness}`;
            let locatorName = `locator-${uniqueness}`;
            console.log("Creating the output Asset to encode content into...");
            let outputAsset = await mediaServicesClient.assets.createOrUpdate(resourceGroup, accountName, outputAssetName, {});
            if (outputAsset.name !== undefined) {
                console.log("Submitting the encoding job to the Transform's job queue...");
                let job = await submitJob(encodingTransformName, jobName, input, outputAsset.name);
                console.log(`Waiting for Job - ${job.name} - to finish encoding`);
                job = await waitForJobToFinish(encodingTransformName, jobName);
                if (job.state == "Finished") {
                    await downloadResults(outputAsset.name, outputFolder);
                }
                let locator = await createStreamingLocator(outputAsset.name, locatorName);
                let urls;
                if (locator.name !== undefined) {
                    urls = await getStreamingUrls(locator.name);
                } else {throw new Error("Locator was not created or Locator.name is undefined")};
                res.status(200).send({message: "Video asset is uploaded successfully", mainfestPath: urls});
            }
        }catch(err){
            console.error(err);
            res.status(500).send({errorName: err.name, errorMessage: err.message});
        }
    }else{
        res.status(400).send({ errorName: "Bad Request", errorMessage: "Missing data in the request body" });
    }
}