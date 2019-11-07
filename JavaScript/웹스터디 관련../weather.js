const axios = require('axios');

let APIKEY = 'e73b469f2c515631b3ddcf5dbf110a3d';

axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${APIKEY}`)
.then(results => {
    console.log(results.data);
})