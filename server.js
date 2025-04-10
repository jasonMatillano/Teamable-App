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
    //get data from database
    
    const response = {
        name: 'John Doe',
        email: 'a@b.com',
        interests: 'coding'
    }
    res.send(response);
})

// Start the server and listen on port 3000, with a callback to log a message
app.listen(3000, () => {
    console.log('listening on port 3000');
});