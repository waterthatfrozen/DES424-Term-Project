# QikVid
Also known as *QuickVid*, Not-so-simple Web application for short-format video streaming.  
**DES424** |  Cloud-based Application Development  
Digital Engineering Department, Semester 1, Academic Year 2022  
Sirindhorn International Institute of Technology (SIIT), Thammasat University

---

## Table of Contents
- [Project Members](#project-members)
- [Project Description](#project-description)
    - [Overview](#overview)
    - [Application Stack](#application-stack)
    - [Cloud Services Usage](#cloud-services-usage)
    - [CI/CD Configuration](#cicd-configuration)
    - [Software Testing and QA](#software-testing-and-qa)
- [Project Features](#project-features)
    - [Users](#users)
    - [Admin](#admin)
- [Cloud Resources](#cloud-resources)
- [Application Demo](#application-demo)
- [Local Deployment](#local-deployment)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Project Management](#project-management)
- [Deliverables](#deliverables)

## Project Members
- Thanyachanok Rachawongsuk [@thanyachanokr](https://github.com/thanyachanokr) (6222770313) (Role: Design & Document)
- Paphana Yiwsiw [@waterthatfrozen](https://github.com/waterthatfrozen) (6222780379) (Role: Cloud, Backend & QA)
- Kawiya Pholjaroen [@6222782425](https://github.com/6222782425) (6222782425) (Role: Frontend)
- Time Kitilimtrakul [@6222790345](https://github.com/6222790345) (6222790345) (Role: Document & Management)
- Levin Kaus [@levinKaus](https://github.com/levinKaus) (6522808210) (Role: Backend & Database)

## Project Description
### Overview
QikVid is a web application that allows users to upload and stream short-format videos. The web application is designed to be responsive and accessible on all devices.  

### Application Stack
The web application is built using the MERN stack (MongoDB, Express, React, Node.js).
Express.js and Node.js are used to build the backend of the web application, while React is used to build the frontend. MongoDB is used as the database to store the data of the web application. Frontend can be found in the `client` folder, while backend can be found in the `api` folder.

### Cloud Services Usage
The web application is deployed on Microsoft Azure using the App Service and the MongoDB database is deployed on Microsoft Azure using the Cosmos DB. Azure Media Player is used to stream the videos on the web application.  

### CI/CD Configuration
CI/CD is implemented with Azure Static Web Apps and GitHub Actions to automatically deploy when a new commit is pushed to the main branch. Configuration files can be found in the `.github/workflows` folder.

### Software Testing and QA
Test scripts are written using Robot Framework and Selenium Library to test the web application. Test scripts are located in the `testing` folder.

## Project Features
### Users
- User can register and login to the web application.
- User can upload a video to the web application.
- A random video will be displayed on the homepage and the user can click on the video to watch it.
- User can like a video and the number of likes will be displayed on the video.
- User can view their profile and see the videos they have uploaded.
- User can delete their videos.

### Admin
- Admin can deactivate a user account.
- Admin can delete any videos.

## Cloud Resources
- Azure App Service for hosting the backend web application
- Azure Static Web Apps for hosting the frontend of the web application
- DNS Zone for creating a custom domain name for the web application
- Azure Cosmos DB for MongoDB for storing the data of the web application
- Azure Storage Account for storing the uploaded videos
- Azure Media Services for encoding and streaming the uploaded videos

## Application Demo
[QikVid on Azure App Services](https://qikvid.azurewebsites.net/) or [QikVid on Azure Static Web Apps](https://yellow-island-01d23da00.2.azurestaticapps.net/)

## Local Deployment
### Prerequisites
- Node.js v16 or higher
- Azure Account with subscription and these resources:
    - Azure Media Services
    - Azure Storage Account
    - Azure Cosmos DB for MongoDB

### Installation
1. Clone the repository
2. Install dependencies for the backend
```bash
cd api
npm install
```
3. Install dependencies for the frontend
```bash
cd ../client
npm install
```
4. Create a `.env` file in the `api` folder and add the following environment variables
```bash
## These environment variables can be generated and found in the Azure Portal

APPINSIGHTS_INSTRUMENTATIONKEY= # Application Insights Instrumentation Key
APPLICATIONINSIGHTS_CONNECTION_STRING= # Application Insights Connection String
AZURE_ARM_ENDPOINT= # Azure Resource Manager Endpoint
AZURE_ARM_TOKEN_AUDIENCE= # Azure Resource Manager Token Audience
AZURE_CLIENT_ID= # Azure Client ID
AZURE_CLIENT_SECRET= # Azure Client Secret
AZURE_COSMOSDB_CONNECTION_STRING= # Azure Cosmos DB Connection String
AZURE_MEDIA_SERVICES_ACCOUNT_NAME= # Azure Media Services Account Name
AZURE_RESOURCE_GROUP= # Azure Resource Group
AZURE_STORAGE_ACCOUNT_NAME= # Azure Storage Account Name
AZURE_STORAGE_CONNECTION_STRING= # Azure Storage Connection String
AZURE_SUBSCRIPTION_ID= # Azure Subscription ID
AZURE_TENANT_DOMAIN= # Azure Tenant Domain
AZURE_TENANT_ID= # Azure Tenant ID
AzureWebJobsStorage= # Azure Web Jobs Storage
OUTPUTCONTAINERSAS= # Output Container SAS
REMOTESTORAGEACCOUNTSAS= # Remote Storage Account SAS
WEBSITE_CONTENTAZUREFILECONNECTIONSTRING= # Website Content Azure File Connection String
WEBSITE_CONTENTSHARE= # Website Content Share
WEBSITE_NODE_DEFAULT_VERSION = "~16" # Website Node Default Version

## Note for course instructor: If there is any problem, please contact us for the values of the environment variables. ##
```
5. Run the backend and the frontend
```bash
# Backend
cd ../api
npm start 

# Backend will be running on port 5000
```
```bash
# Frontend
cd ../client
npm start 
# Frontend will be running on port 5000

# - or - #

cd ../client
npm run build # Build the frontend
npm install -g serve # Install serve
serve -s build 

# Frontend will be running on port 3000
```
6. Open the web application on `http://localhost:3000`
7. Enjoy!
8. (Optional) Run the test scripts. _Make sure the backend is running on port 5000, the frontend is running on port 3000 and installed robot framework, selenium library, and chromedriver._
```bash
# Check if robot framework and selenium library are installed
robot --version

# If not, install robot framework and selenium library
pip install robotframework
pip install robotframework-seleniumlibrary

# Check if chromedriver is installed
chromedriver --version

# If not, install chromedriver
```

```bash
# Run the test scripts
## Some scripts require some varibles changes in the test scripts, such as new username and email and ABSOLUTE path of the sample video file. ##

cd ../testing

# Test login
robot testLogin.robot

# Test signup
robot testSignup.robot

# Test upload video and delete video
robot testUploadVideoandDeleteVideo.robot

# Test play video and like video
robot testPlayandLikeVideo.robot
```

## Project Management
We used JIRA to manage our project. The link to the JIRA board can be found [here](https://paphana.atlassian.net/jira/software/projects/DTP/boards/1/roadmap?shared=&atlOrigin=eyJpIjoiNjQzZDhhOTQxZGY3NDdhMGE5ODQzZDAzYjMzY2E1YmYiLCJwIjoiaiJ9).  
__Note:__ The JIRA board is only accessible to the course instructor and the team members.

## Deliverables
Please click the box in front of each topic to access the listed document.
*These listed document is only accessible with ***SIIT*** email account*  
- [[/]](https://drive.google.com/file/d/1h-T9NTyA9GwxvaMqUdwn2v7MWOLPTha9/view?usp=sharing) Kick-off Project Report
- [[/]](https://drive.google.com/file/d/134FEbOzQIUFgJ_oEYinnjs4Kawbmnucr/view?usp=sharing) Kick-off Project Presentation
- [[/]](https://drive.google.com/file/d/17IAO09pFB6VL-ch35T2H7y-4rDKazro9/view?usp=sharing) Final Project Report
- [[/]](https://drive.google.com/file/d/1bPUdsWznhZyl_C9msrJdH8oQIjjZu2tm/view?usp=sharing) Final Project Presentation
- [[/]](https://drive.google.com/file/d/1uoUwIvTd58zyP-CuEygsWvEFG8TCxXgr/view?usp=sharing) User Manual
---
