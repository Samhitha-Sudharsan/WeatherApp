const express = require('express');
const axios = require('axios');

const app = express();
const apiKey = '9732e0e455c1c6203ac48f71e92c809d';

app.get('/', (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.send('Please provide a city name as a query parameter, e.g.,?city=London');
  }

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
   .then(response => {
      const { name, main, weather } = response.data;
      const temp = main.temp;
      const description = weather[0].description;

      res.send(`The current temperature in ${name} is ${temp}°C with ${description}.`);
    })
   .catch(error => {
      if (error.response && error.response.status === 404) {
        res.send('City not found.');
      } else {
        res.send('An error occurred. Please try again later.');
      }
    });
});

app.listen(3000, () => {
  console.log('Weather app listening on port 3000!');
});