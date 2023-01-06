// counter for error alerts
var alertCount = 0;

// define function to handle form submmissions
makeRequest = (e) => {
    // prevent default submission behaviour
    e.preventDefault();

    // get the prompt from the input element
    const prompt = document.querySelector("#input").value;

    // check if the input field is empty and display this alert if it is
    if (prompt === '') {
        alert('Please type a prompt. Ex: "A teddy bear in space, in the style of Monet"');
        return;
    }

    // loop 3 times so 3 different images are generated by calling the generateImageRequest function
    for(let i = 0;i < 3;i++){
        // reset alertCount to 0
        alertCount = 0;
        generateImageRequest(prompt);
    }
}
  
// define an async function to make a POST request to the /openai/genImage endpoint
async function generateImageRequest(prompt) {
    // clear the text content of the #grid element
    document.querySelector("#grid").textContent = "";

    // make a POST request to the /openai/genImage endpoint
    try {
        const response = await fetch('/openai/genImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            // send the prompt in the request body
            body: JSON.stringify({
                prompt,
            }),

        });

        // if the response is not okay, display an alert and throw an error
        if (!response.ok) {
            // for each response, increase alertCount by 1
            alertCount = alertCount + 1;
            alert('ERROR ' + alertCount + '/3 : Your images could not be generated. The image you tried to generate may have been inappropriate, or there has been an error. Please try a different prompt.');
            throw new Error('ERROR: Your images could not be generated. The image you tried to generate may have been inappropriate, or there has been an error. Please try a different prompt.');
        }

        // if the response is successful, get the JSON data from the response
        const data = await response.json();
        console.log(data)

        // extract the image URL from the data
        const imageUrl = data.data;

        // create an img element with "img" class
        let image = document.createElement("img");
        image.className = "img";
        // set the src of the img element to the image URLpo
        image.src = imageUrl;
        
        // add a double-click event listener to the img element that opens the image in a new tab
        image.addEventListener("dblclick", function(){
            window.open(imageUrl);
        })

        // append the img element to the #grid element to display it in the grid
        document.querySelector("#grid").appendChild(image);
    }

    // if there is an error, log it to the console
    catch (error) {
        console.log(error);
    }
}
  
// event listeners that run the makeRequest function
document.querySelector("#search").addEventListener('click', makeRequest);
document.querySelector("#input").addEventListener("keyup", (event) => {
    if (event.key == "Enter"){
        makeRequest(event)
    }
})