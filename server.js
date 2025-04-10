// Import the Express.js framework
const express = require('express');

// Create an instance of an Express application
const app = express();

// Import the body-parser middleware to parse incoming request bodies
const bodyParser = require('body-parser');

// Use bodyParser middleware to parse JSON data in incoming requests
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS) from the current directory
app.use('/', express.static(__dirname + '/dist'));

// Define a route to handle incoming requests
app.get('/get-profile', (req, res) => {
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
app.post('/update-profile', (req, res) => {
    const payload = req.body
    // Update data in database

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