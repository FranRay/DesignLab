// import the necessary modules
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();

// create a new express app
const app = express();

// import the genImage route from aiRouter.js
const genImage = require('./routes/aiRouter.js');

// set the port to 5000 or the value of the PORT environment variable
const PORT = process.env.PORT || 5000;

// enable body parser middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set the 'public' folder as the static directory for the app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'etc')))

// use the genImage route when the /openai endpoint is hit
app.use('/openai', genImage);

// start the server and log a message to the console when it is live
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`))