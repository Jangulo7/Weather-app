// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// App path
//const appPath = require("appPath");

// Initialize the main project folder
app.use(express.static('website'));
//app.use(express.json());

// Setup Server
const port = 3555;
// Spin up the server
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

// GET method route
 // Respond with object projectData when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send(projectData);
});
/*
// Same as above with arrow function
app.get('/', (req, res)=> {
    res.send(projectData);
});
*/

// POST method route
app.post('/add', function (req, res) {
    let data = request.body;
    projectData['content']=data.content;
    projectData['date']=data.date;
    projectData['temp']=data.temp;
    res.send(projectData);
});


