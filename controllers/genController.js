// import Configuration and OpenAIApi objects from openai module
const { Configuration, OpenAIApi} = require("openai");

//create a new configuration object using the API key stored in a var in the env file
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

//create a new OpenAIApi object using the configuration object
const openai = new OpenAIApi(configuration);

// define an async function to generate an image based on a user-given prompt
const genImage = async (req, res) => {
    // extract the prompt from the request body
    const { prompt } = req.body;
    
    // use the createImage method of the openAI object to generate an image
    try {
        const response = await openai.createImage({
            prompt,
            n: 3,
            size: '512x512',
        });

        // extract the image URL from the response data
        const imageUrl = response.data.data[0].url
        
        // send the image url back to the client as a JSON object in the response
        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } 
    
    // if there is an error in generating the image, log the error message and send it back to the client
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        }

        else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

// export the genImage function
module.exports = {genImage};