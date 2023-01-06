const dotenv = require("dotenv").config()

// refer to the API KEY from config.js and generate API URL
const API_CLIENTID = process.env.UNSPLASH_API_KEY;
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${API_CLIENTID}`

// declare a function to fetch and display images from the Unsplash API
imgRequest = () => {
  // clear the grid element
  document.querySelector("#grid").textContent = "";

  // build the API url with the user's search input
  let url = `${API_URL}&query=${input.value}`
  // fetch the data from the API
  fetch(url)

  // if the response is not okay, throw an error 
  .then(response => {
    if (!response.ok) throw Error(response.statusText);
      return response.json();
  })

  // display the images in the grid
  .then(data => {
    loadImages(data);
  })

  // log any errors
  .catch(error => console.log(error));   
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
document.querySelector("#search").addEventListener('click', imgRequest);
document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    imgRequest();
});