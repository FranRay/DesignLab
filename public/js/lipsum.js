// get the necessary elements from the DOM
const genForm = document.getElementById('generator-form');
const genBtn = document.getElementById('gen-btn');
const copyBtn = document.getElementById('copy-btn');
const genContent = document.getElementById('gen-content');

// set default count value to 5 & default option to 'paras;
let count = 5, option = "paras", tempCount = 0, tempOption = "";

// define a function to get user input count value
function getValues(){
    // get the count value from the form and set it to the count variable
    count = parseInt(genForm.gen_count.value);
    // get the option value from the form and set it to the option variable
    option = genForm.gen_options.value;
    // valudate the count and option values
    validateValues();

    // constructt the URL for the API request using the count and option values
    let url = `https://baconipsum.com/api/?type=meat-and-filler&${option}=${count}&start-with-lorem=1`;

    // fetch the content using the URL
    fetchContent(url);
}

// define a function to validate the count and option values
function validateValues(){

    // if the option is "words", set the count to 100 and the option to "paras", then store the original count value in a temp variable
    if(option === "words"){
        [tempCount, tempOption] = [count, option];
        [option, count] = ["paras", 100]; // 100 paragraphs will be generated and then words will be extracted from it

        // if the count value is larger than 2000, show an error and set the count value to 2000
        if(tempCount > 2000){
            invalidInput();
            tempCount = 2000; // max words which can be generated is 2000
            genForm.gen_count.value = "2000";
        } 
        
        // if the count value is less than 1 or is not a number, show an error and set the count value to 5
        else if(tempCount < 1 || isNaN(tempCount)){
            invalidInput();
            tempCount = 5; // min words is 5 
            genForm.gen_count.value = "5";
        }
    } 
    
    else {
        // reset the temporary count option
        tempCount = "";

        // if the count value is more than 100, show an error and set the count value to 100
        if(count > 100){
            invalidInput();
            count = 100; // max paras or sentences is 100
            genForm.gen_count.value = "100";
        } 
        
        // if the count value is less than 1 or is not a number, show an error and set the count value to 5
        else if(count < 1 || isNaN(count)){
            invalidInput();
            count = 5; // min paras or sentences is 5
            genForm.gen_count.value = "5"; 
        }
    }
}

// function to show an error when invalid input is entered
function invalidInput(){
    genForm.gen_count.style.borderColor = "#ff6a67";
    setTimeout(() => {
        genForm.gen_count.style.borderColor = "#d3dbe4";
    }, 1000);
}

// fetching the randomly generated text from the API
async function fetchContent(url){
    let response = await fetch(url); // fetch request to the API

    // if the request is successful (status code 200)
    if(response.status === 200){
        // parse the data into json format and display generated content
        let data = await response.json();
        displayGenContent(data);
    } 
    

    // if the request is not successful, show an error message
    else {
        alert("An error occurred");
    }
}

// displaying the generated random text
function displayGenContent(data){
    console.log(data);
    let texts = "";

    // if the option is words, we will generate entered no. of words by using paragraphs
    if(tempOption === "words"){
        tempOption = ""; // reset temporary count option

        // join the data array into a string
        texts = data.join();
        console.log(texts);

        // if the tempCount value is less than or equal to the length of the texts string
        if(tempCount <= texts.length){
            // split the texts string into an array of words using spaces
            let textArray = texts.split(" ");
            // select only the number of words specified by the user in the tempCount value
            let selectedText = textArray.splice(0, tempCount).join(" "); 
            // display the selected text in the genContent element, followed by a period at the end.
            genContent.innerHTML = selectedText + ".";
            return;
        }
    } 
    
    // if the option is not "words"
    else {
        // join the data arrau into a string, separated by two line breaks
        texts = data.join("<br><br>"); 
        // display the text content in the genContent element
        genContent.innerHTML = texts;
    }
}

// declare function to copy text to clipboard
function copyToClipboard(){
    let copyText = genContent.textContent;
    navigator.clipboard.writeText(copyText);
}

// event listeners that run the getValues and copyToClipboard functions
genBtn.addEventListener('click', getValues);
window.addEventListener("DOMContentLoaded", getValues);
copyBtn.addEventListener('click', copyToClipboard);