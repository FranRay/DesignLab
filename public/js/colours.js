// get the necessary elements from the DOM
const clickedColour = document.querySelector('.clicked-colour')
const hexValue = document.querySelector('.hex-colour')
const colourValue = document.querySelectorAll('.colour-value')
const colourValueCopy = document.querySelectorAll('.colour-value')
const colourValueText = document.querySelectorAll('.colour-value-text')
const generateBtn = document.querySelector('.btn')

// disable the default scrolling behavior of the space key when pressed down
window.onkeydown = function(e) {return !(e.key == ' ' && e.target == document.body);};

// declare function to generate a random color in hexadecimal format
getRandomColor = () => {
    // define the list of hexadecimal digits
    var letters = '0123456789ABCDEF';

    // initialize the color string with a pound sign
    var color = '#';

    // loop 6 times to generate a 6-digit hexadecimal color code
    for (var i = 0; i < 6; i++) {
      // Generate a random number between 0 and 15, and use it to select a digit from the letters string
      color += letters[Math.floor(Math.random() * 16)];
    }

    // return the generated color
    return color;
}

// function to gnerate random colors and update the page with the new colors
generateRandomColour = () => {
    // loop through each text element in the colourValueText array
    colourValueText.forEach((text) => {
        // generate a random color and update the text of the element with the new color
        text.innerText = getRandomColor()
        // get the previous element of the text element and set its background color to the new color
        text.previousElementSibling.style.backgroundColor = `${text.innerText}`
    })
}

// run the generateRandomColour function
generateRandomColour()

// add a click event listener to each element in the colourValue array
clickedColorPalette = () => {
    // loop through each element in the colourValue array
    colourValue.forEach((colour) => {
        // add a click event listener to the element
        colour.addEventListener('click', () => {
            
            // when the element is clicked, add the "success" class to the element
            colour.classList.add('success');
            // add the "active" class to the clickedColour element to show a pop up
            clickedColour.classList.add('active')
            // add the HEX value of the clicked color to the pop up
            hexValue.innerText = `${colour.lastElementChild.innerText}`

            // select the text content of the clicked element
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(colour);
            selection.removeAllRanges()
            selection.addRange(range)
            
            // try to copy the selected text to the clipboard
            try {
                document.execCommand('copy')

                // if the copy operation was successful,
                // remove the selection and the "success" class from the clicked element after 1 second
                selection.removeAllRanges()
                setTimeout(() => {
                    colour.classList.remove('success');
                }, 1000)
            
            // if the copy operation failed, throw an error
            } catch(e) {
                const errorMsg = document.querySelector('.error-msg');
                errorMsg.classList.add('show');
    
                setTimeout(() => {
                errorMsg.classList.remove('show');
                }, 1000);
            }

            // remove the "active" class from the clickedColour element after 1.5 seconds
            setTimeout(() => {
                clickedColour.classList.remove('active')
            }, 1500)
        })
    })
}

// call the clickedColorPalette function to add the click event listeners to the elements in the colourValue array
clickedColorPalette()


/// declare function to copy all hexadecimal color values to the clipboard
copyAllHexValues = () => {
    // initialize an array to store the color values
    let values = [];

    // loop through all elements with the "colour-value-text" class
    // and add their inner HTML (which should be a hexadecimal color value) to the values array
    document.querySelectorAll('.colour-value-text').forEach( (p) => values.push( p.innerHTML ) );
    
    // create a new textarea element
    let text = document.createElement('textarea');
    
    // append the textarea element to the document body
    document.body.appendChild(text);
    
    // set the value of the textarea element to be a comma-separated list of the hexadecimal color values
    text.value = values.join(', ');
    
    // select the text in the textarea element
    text.select();

    // copy the selected text to the clipboard and remove it from the document
    document.execCommand('copy');
    text.parentNode.removeChild(text);
       
}

// event listener for the c key
document.addEventListener('keydown', (e) => {
    const c_keyDown = e.key

    // if the key pressed was "c", call the copyAllHexValues function
    if(c_keyDown == 'c') {
        copyAllHexValues()
        }
    })

// event listener for the space key
document.addEventListener('keydown', (e) => {
    const spacebarDown = e.key

    // if the spacebar is pressed down, call the generateRandomColour function
    if(spacebarDown == ' ') {
        generateRandomColour()
        }
})

// event listener for a click on the generate palette button
generateBtn.addEventListener('click', () => {
    // call the generateRandomColour function
    generateRandomColour()
})