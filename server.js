// Import the Express.js framework
const express = require('express');

// Import the MongoDB client
const { MongoClient } = require('mongodb');

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
    console.log('Connected successfully to server');

    // Get data from database

    // Return a JSON response
    const response = {
        name: 'John Doe',
        email: 'a@b.com',
        interests: 'coding'
    }
    res.send(response);
})

// Define a route to handle incoming requests
app.post('/update-profile', async (req, res) => {
    const payload = req.body
    console.log(payload)

    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to server');

    // initialize database
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // save payload data in database
    await collection.insertOne({_id: 1, name: 'John Doe', email: 'a@b.com', interests: 'coding'});
    await collection.insertOne({_id: 2, name: 'John 2', email: 'a@b2.com', interests: 'coding2'});
    

    // Return a JSON response
    if (!payload.name || !payload.email || !payload.interests) {
        return res.status(400).send({error: 'invalid request'});
    } else {
        return res.status(200).send({info: 'update user profile successfully'});
    }
})

// Start the server and listen on port 3000, with a callback to log a message
app.listen(3000, () => {
    console.log('listening on port 3000');
});