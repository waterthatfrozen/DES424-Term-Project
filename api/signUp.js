require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AZURE_COSMOSDB_CONNECTION_STRING = process.env["AZURE_COSMOSDB_CONNECTION_STRING"];

module.exports = async function (req,res) {
    console.log("Sign up function is called");
    const client = new MongoClient(AZURE_COSMOSDB_CONNECTION_STRING);
    client.connect();
    if (!AZURE_COSMOSDB_CONNECTION_STRING) {throw Error("Azure Cosmos DB Connection string not found");}
    if (req.body.username !== "" && req.body.email !== "" && req.body.password !== "") {
        // Get reference of database and collection
        let db = await client.db(`qikvid-db`);
        let collection = await db.collection('users');

        // Check if email or username already exists
        const foundEmail = await collection.findOne({email: req.body.email });
        if(foundEmail != null) {
            console.log("Email is found");
            res.status(400).send({ message: "The provided email is already in use."});
        } 
        else {
            const foundUsername = await collection.findOne({ username: req.body.username });
            if(foundUsername != null) {
                console.log("Username is found");
                res.status(400).send({message: "The provided username is already in use."});
            }
            else {
                // Create new doc and upsert (create or replace) to collection
                let today = new Date();
                let timestampString = today.toISOString();
                const user = { 
                    username: req.body.username, 
                    email: req.body.email, 
                    password: req.body.password,
                    created: timestampString,
                    userLevel: "user"
                };
                const query = { username: user.username};
                const update = { $set: user };
                const options = {upsert: true, new: true};
                // Insert via upsert (create or replace) doc to collection directly
                try{
                    const upsertResult1 = await collection.updateOne(query, update, options);
                    console.log("Signing up new user");
                    res.status(200).send({message: "Sign up new user successfully", timestamp: timestampString});
                }catch(error){
                    res.status(500).send({message: "Error while signing up", error: error});
                }finally{
                    client.close();
                }
            }
        }
    }
    else {
        context.res = { status: 400, body: "Please pass name, email and password in the request body" };
    }
}