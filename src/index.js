// Deliverable 1 
// See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

// Deliverable 2
// Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.

// Fetch our ramen objects
fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((ramenObjects) => {
        // We can iterate over our array of ramen objects so that we can call a function on each object

        // forEach approach
        ramenObjects.forEach(ramenObject => renderRamenMenuItem(ramenObject))
        
        // traditional for loop approach
        // for (let i = 0; i < ramenObjects.length; i++) {
        //     renderRamenMenuItem(ramenObjects[i])
        // }
        
        // Advanced Deliverable - Don't worry too much about this
        selectRamen(ramenObjects[0])
    })

// Takes in one ramen object and adds it to the ramen-menu
function renderRamenMenuItem(ramen) {
    // create an img element to display our ramen image
    const newImg = document.createElement('img')
    newImg.src = ramen.image

    // set up a click event to "select" the ramen you clicked and display the info
    newImg.addEventListener('click', () => selectRamen(ramen)) 

    // append our ramen img (with event listener attached!) to the menu
    document.querySelector('#ramen-menu').appendChild(newImg)
}

// Displays the selected ramen's details
function selectRamen(ramen) {
    // each of these blocks is selecting an element from the dom - then changing the value to be our selected ramen info

    const img = document.querySelector('.detail-image')
    img.src = ramen.image

    const name = document.querySelector('.name')
    name.textContent = ramen.name

    const restaurant = document.querySelector('.restaurant')
    restaurant.textContent = ramen.restaurant

    const rating = document.querySelector('#rating-display')
    rating.textContent = ramen.rating

    const comment = document.querySelector('#comment-display')
    comment.textContent = ramen.comment
}

// Deliverable 3
// Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

// Select our form element from the DOM
const form = document.querySelector("#new-ramen")

// Set up an event listener to listen for our form submission
form.addEventListener('submit', (event) => handleSubmit(event))

function handleSubmit(event) {
    // We almost always want to prevent the default behavior of a form
    event.preventDefault()

    // Creating an object to hold the values from our form inputs - in this case we are just going to pass it to another function, BUT you could use this object to POST your data as well ;)
    const ramenObject = {
        "name": event.target.name.value,
        "restaurant": event.target.restaurant.value,
        "image": event.target.image.value,
        "rating": event.target.rating.value,
        "comment": event.target['new-comment'].value
    }

    // Pass our newly created object to renderRamenMenuItem so we can add it to our menu at the top
    renderRamenMenuItem(ramenObject)

    // Display the new ramen we created!
    selectRamen(ramenObject)

    // Clear the form inputs when we're done
    form.reset()
    // OR event.target.reset()
}