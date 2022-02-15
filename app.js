// What are we doing in our app???

// Create an app object (to make use of namespacing)
const artApp = {};

// Save information which will be reused (e.g. API key) within properties on the app object
artApp.apiKey = `rtliWmhr`;
artApp.apiUrl = `https://www.rijksmuseum.nl/api/en/collection`;

// Create a method which will make a call to the API and get some data back
// THEN we will take that data and put it on the page
artApp.getArt = function (usersChosenAnimal) {

    // use the URL constructor to format the API endpoint to which we will be making our request
    const url = new URL(artApp.apiUrl);

    // console.log(url);

    // format and add our parameters to our URL:
    url.search = new URLSearchParams({
        // include the API parameters here:
        key: artApp.apiKey,
        q: usersChosenAnimal,
        imgonly: true,
        ps: 25
    });

    // now it is finally time to FETCH some data from the beautiful API endpoint we have just constructed
    fetch(url)
        .then(function (apiResponse) {
            // take the Promise that is returned and parse it into json
            return apiResponse.json()
        })
        .then(function (artFromTheApi) {
            // // this gives us back the whole object from the API
            // console.log(artFromTheApi)

            // let's navigate into the property of the whole object which provides us with JUST the art data
            console.log(artFromTheApi.artObjects);

            // take the data returned from the API and passing it to the display method
            artApp.displayArt(artFromTheApi.artObjects);

        })

}


// Create a method which will take the API data and display on our page
artApp.displayArt = function (artArray) {
    // clear the gallery of old art BEFORE adding new art to the page
    const ulElement = document.querySelector('#artwork');
    ulElement.innerHTML = '';

    artArray.forEach(function (individualArtObject) {
        // console.log(individualArtObject);

        // extract the data from the API (artist name, piece title, image URL, alt text) and save it within variables 
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker;
        const altText = individualArtObject.longTitle;

        // console.log(artworkTitle, artworkImage, artist, altText);

        // create an li element with a class of piece in which this information will be added
        const listElement = document.createElement('li');
        // console.log(listElement);
        listElement.classList.add('piece');

        // create an h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;

        // create an img to hold the artwork picture
        const image = document.createElement('img');

        // this element node has src and alt properties which we can use!
        // console.log(image);

        image.alt = altText;
        image.src = artworkImage;

        // create a p with a class of artist to hold the artist name
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        // // take the elements we have created and add them to the li
        // listElement.appendChild(heading)
        // listElement.appendChild(image)
        // listElement.appendChild(paragraphElement);

        // another way of writing this 👆🏽 is this 👇🏽
        listElement.append(heading, image, paragraphElement)

        // add the li to the ul (so that the data is finally in the DOM!!!!!)
        ulElement.appendChild(listElement);


    })
}

// Create a method which will update the heading of the page
artApp.updateAnimalHeading = function (animal) {
    document.querySelector('#page-title span').textContent = `${animal}s`;
}

// Create a method which sets up all of the event listener within this app
artApp.eventListenerSetUp = function () {

    // 1st event listener: on the select element (whenever the user selects a different option, take the chosen animal and get the art related to that animal!)
    const selectElement = document.querySelector('#animalChoices');

    // when the user selects a different animal option - AKA when the animal choice CHANGES - get me art related to the new animal
    selectElement.addEventListener('change', function () {
        console.log('I have selected a new animal!')

        // // This will give us back the object which owns the currently executing code (AKA the select element node object!)
        // console.log(this);

        // // this will give us the value of the user's selected option
        // console.log(this.value);

        const selectedAnimal = this.value;

        // pass the user's selected animal into the getArt method!
        artApp.getArt(selectedAnimal);

        // update the title of the page to reflect the user's animal choice
        artApp.updateAnimalHeading(selectedAnimal);
    })

}


// Create an initialization method which will kickstart our app
artApp.init = function () {
    console.log('App is initialized!');

    // set up our event listeners (so they are ready to go as the user moves through the app)
    artApp.eventListenerSetUp();

    // call the method which will get us our art data (so that there is art displaying on the page when the user first arrives)
    artApp.getArt('bear');
}

// Call the initialization method (at the end of our code)
artApp.init();

// extra comment to push my code to github