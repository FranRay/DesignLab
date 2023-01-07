// define function to get form submmissions
getQuery = (e) => {
  // prevent default submission behaviour
  e.preventDefault();

  // get the query from the input element
  const query = document.querySelector("#input").value;

  // call the imgRequest function
  imgRequest(query);
}

// define an async function to make a POST request to the /api/searchTerms endpoint
imgRequest = async (query) => {
    // clear the text content of the #grid element
    document.querySelector("#grid").textContent = "";

    // make a POST request to the /api/searchTerms endpoint
    try {
      const response = await fetch ('/api/searchTerms', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },

          // send the prompt in the request body
          body: JSON.stringify({query})
      }) 

      // if the response is successful, get the JSON data from the response
      const data = await response.json();
      // call the loadImages function to display the results
      loadImages(data)
    }

    // if there is an error, log it to the console
    catch (error) {
        console.log('ERROR:', error);
    }
}

// declare function for loading and displaying images 
loadImages = (data) => {
  // for every result in the search
  for(let i = 0;i < data.results.length;i++){
    // create a div element with an "img" class
    let image = document.createElement("div");
    image.className = "img";

    // set the background image of the div element to the image from the results
    image.style.backgroundImage = "url("+data.results[i].urls.raw + "&w=1366&h=768" +")";

    // add a double-click event listener to the img element that opens the image in a new tab
    image.addEventListener("dblclick", function(){
      window.open(data.results[i].links.download, '_blank');
    })

    // append the img element to the #grid element to display it in the grid
    document.querySelector("#grid").appendChild(image);
  }
}

// event listeners that run the imgRequest function when enter or search button are pressed
document.querySelector("#search").addEventListener('click', getQuery);
document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    getQuery(event);
});