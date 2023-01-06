// import the express module, and genImage function from genController
const express = require('express')
const {genImage} = require('../controllers/genController');

// create a new express router
const router = express.Router();

// add a POST route that calls the genImage function when the /genImage endpoint is hit
router.post('/genImage', genImage);

// export the router for use in the application
module.exports = router;