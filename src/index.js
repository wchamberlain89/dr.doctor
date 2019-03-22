import $ from 'jquery';
import './scss/styles.scss';
import {DrApi} from './js/classes/drApi.js';
import {Geocode} from './js/classes/geocode.js';
import {get} from './js/functions/promise.js';

function parseParams(parameters) {
  return Object.keys(parameters).reduce((acc, key) => {
    return acc += key + "=" + parameters[key] + "&";
  }, "?");
}

function generateUrl(obj, params) {
  return obj.baseUrl + params + obj.keyName + "=" + obj.key;
}

function getLocationString(array) {
  return `${array.lat}%2C${array.lng}%2C100`;
}

$(document).ready(function(){

  const geocode = new Geocode();
  const drApi = new DrApi();

  console.log(drApi.baseUrl)

  $("form").on("submit",(event) => {
  	event.preventDefault();
  	
  	const query = $("#search").val();

    const geocodeParams = parseParams({city : 'portland'});
    const apiCall = generateUrl(geocode, geocodeParams);
    const getLocation = get(apiCall);

    getLocation()
      .then(function(response) {
        const results = JSON.parse(response);
        const location = getLocationString(results.results[0].location);

        const parameters = parseParams({location: location, q: query});
        console.log(parameters)
        const drApiUrl = generateUrl(drApi, parameters);

        
        return get(drApiUrl)();
      })
      .then(function(response){
        response = JSON.parse(response);
        var data = response.data.map((doctor) => {
          return doctor.profile
        });
        data.forEach((profile) => {
          $("#results").append(`<li>First-Name - ${profile.first_name} Last-Name - ${profile.last_name}</li>`)
        });

      });

  });
});
