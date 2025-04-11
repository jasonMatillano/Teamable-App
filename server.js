// Import the Express.js framework
const express = require('express');

// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Import the validator module
const { isEmptyPayload, isInvalidEmail } = require('./validator');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'company_db';
const collectionName = 'employees';


// Create an instance of an Express application
const app = express();

// Import the body-parser middleware to parse incoming request bodies
const bodyParser = require('body-parser');

// Use bodyParser middleware to parse JSON data in incoming requests
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS) from the dist directory
app.use('/', express.static(__dirname + '/dist'));

// Define a route to handle incoming requests
app.get('/get-profile', async(req, res) => {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    // initialize database
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Get data from database
    const result = await collection.findOne({id: 1});
    console.log(result);

    // close connection
    client.close();

    response = {}

    if (result!==null) {
        response.name = result.name;
        response.email = result.email;
        response.interests = result.interests;
    }

    res.send(response);
})

// Define a route to handle incoming requests
app.post('/update-profile', async (req, res) => {
    const payload = req.body
    console.log(payload)

    // Return a JSON response
    if ( isEmptyPayload(payload) || isInvalidEmail(payload)) {
        return res.status(400).send({error: 'invalid payload, could not update user profile'});
    } else {

        // Connect to MongoDB
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        // initialize database
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // save payload data in database
        payload.id = 1
        const updatedValues = {$set: payload}
        await collection.updateOne({id: 1}, updatedValues, {upsert: true});

        // close connection
        client.close();

        return res.status(200).send({info: 'update user profile successfully'});
    }
})

// Start the server and listen on port 3000, with a callback to log a message
app.listen(3000, () => {
    console.log('listening on port 3000');
});