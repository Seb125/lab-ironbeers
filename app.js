const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); // middleware: before a client acesses the server

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI
  .getBeers()
  .then(beersFromApi => {
    //console.log(beersFromApi);
    res.render('beers', beersFromApi)
  })
  .catch(error => console.log(error));

  
});

app.get('/random-beer', async (req, res) => {

  try {
  const response = await punkAPI.getRandom();
  res.render('random-beer', response[0]);
  
  }
  catch(error){

    console.log(error);
}
});

// Assuming you have a route like this for displaying detailed information about a beer
app.get('/beers/:beerId', (req, res) => {
  const beerId = req.params.beerId;
  
  // Retrieve the detailed information about the specific beer using the beerId
  punkAPI.getBeer(beerId)
  .then((beer) => {
    console.log(beer)
    res.render('beerDetails', beer[0]);
  })
  
  // Render the beer details page and pass the beer details to it
  
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
