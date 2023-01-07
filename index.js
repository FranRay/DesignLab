// import the necessary modules
const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();

// import the modules used exclusively for unsplash image search
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const Unsplash = require('unsplash-js').default;
const {toJson} = require('unsplash-js');
global.fetch = fetch;

// create a new express app
const app = express();

// set the port to 5000 or the value of the PORT environment variable
const PORT = process.env.PORT || 5000;

// set the 'public' folder as the static directory for the app
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'etc')))

// enable body parser middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//----------OPENAI ROUTE-----------
//
// import the genImage route from aiRouter.js
const genImage = require('./routes/aiRouter.js');

// use the genImage route when the /openai endpoint is hit
app.use('/openai', genImage);

//----------UNSPLASH ROUTE-----------
//
// initialize unsplash client with the access key
const unsplash = new Unsplash({
    accessKey:process.env.UNSPLASH_API_KEY
})

// set up POST route that searches the unsplash API for photos
app.post('/api/searchTerms', (req, res) => {
    // extract the search query from the request body
    let { query } = req.body;
    // cleanup the query by converting to lowercase
    query = query.toLowerCase();
    //use the unsplash api to search for photos matching the query
    unsplash.search.photos(query, 1, 30)
    .then(toJson) // convert response to json
    .then(json => { 
      // send the search results back to the client
      res.status(200).send(json)
    })
    .catch((error) => {
      // if there is an error, log it and send an error message to the client
      console.log(error)
      res.status(200).send({"error": error})
    })
})

// start the server and log a message to the console when it is live
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`))