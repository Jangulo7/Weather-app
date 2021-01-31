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
//app.use(bodyParser.json({ type: 'application/*+json' }))

// Parse some custom thing into a Buffer
//app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// Parse an HTML body into a string
//app.use(bodyParser.text({ type: 'text/html' }))

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
// Spin up the server
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

// GET method route
// Respond with object projectData when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send(projectData);
});
/* Same as above with arrow function
app.get('/', (req, res)=> {
    res.send(projectData);
});
*/

// POST method route
const data = [];

app.post('/add', function (request, response) {
    let data = request.body;
    console.log(data);
});

/*
// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
})
  
// POST /api/users gets JSON bodies (create user in req.body)
app.post('/api/users', jsonParser, function (req, res) {
})
*/