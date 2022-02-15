// what are we doing in our app?


//create an app object (to make use of namespacing)

const artApp = {};

// save information which will be reused (e.g. API key) within properties on the app object

artApp.apiKey = '8Hv0OfOv';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';


// create a method which will make a call to the API and get some data back
    // THEN we will take that data and put it on the page
artApp.getArt = function(usersChosenAnimal){

   // use the URL constructor to format the API endpoint to which we will be making our request
   const url = new URL( artApp.apiUrl );
   console.log(url);

//    format and add our parameters to our URL
url.search = new URLSearchParams({
    // include the API parameters here:
    key: artApp.apiKey,
    q: usersChosenAnimal,
    imgonly: true,
    ps:25
});

// now it is finally time to FETCH some data from the beautiful API endpoint we have just constructed
fetch(url)
   .then(function(apiResponse){
    //    take the Promise that is returned and parse it into json
    return apiResponse.json()
   })
   .then(function(artFromTheApi){
       console.log(artFromTheApi.artObjects);
    //    take the data returned from the API and passing it to display method
       artApp.displayArt(artFromTheApi.artObjects);
   })
   
}

// Create a method which will take the API data and display on our page
artApp.displayArt = function(artArray){
    artArray.forEach( function(individualArtObject){
        // console.log(individualArtObject)
        // extract the data from the API(artist name, piece title, image URL, alt text) within variables
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker;
        const altText = individualArtObject.longTitle;
        console.log(artworkTitle, artworkImage, artist, altText);
        // create an li element in which this information will be added

        const listElement = document.createElement('li');
        listElement.classList.add('piece');

        // create an h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;
    

        // create an img to hold the artwork picture
        const image = document.createElement('img');
        // this element node has src and alt properties which we can use
        // console.log(image);
        image.alt = altText;
        image.src = artworkImage;

        // create a p with a class of artist to hold the artist name
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        // take the element we have created and add them to the li
        // listElement.appendChild(heading)
        // listElement.appendChild(image)
        // listElement.appendChild(paragraphElement);

        // second way of writing code above

        listElement.append(heading,image,paragraphElement)

        // add the li to the ul (so that the data is finally in the DOM)
        const ulElement = document.querySelector('#artwork');
        ulElement.appendChild(listElement);

    } )
}

// create an initialization method which will kickstart our app

artApp.init = function(){
    console.log('App is initialized');
    // call method which will give us our data
    artApp.getArt('whales');

}

// call initialization method(at the end of the code)
artApp.init();