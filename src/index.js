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

    const geocodeParams = parseParams({city : 'portland', state: 'or'});
    const locationUrl = generateUrl(geocode, geocodeParams);
    const getLocation = get(locationUrl);

    getLocation()
      .then(function(response) {
        const results = JSON.parse(response);
        const location = getLocationString(results.results[0].location);

        const parameters = parseParams({location: location, q: query});
        const drApiUrl = generateUrl(drApi, parameters);
        
        return get(drApiUrl)();
      })
      .then(function(response){
        response = JSON.parse(response);
        var data = response.data.map((doctor) => {
          return {profile : doctor.profile, address : doctor.practices[0].visit_address, phones : doctor.practices[0].phones}
        });

        console.log(data)
        let html = "";
        data.forEach((doctor) => {
          html += `<ul>${doctor.profile.first_name} ${doctor.profile.last_name}
          <li>${doctor.address.street} ${doctor.address.city} ${doctor.address.state_long}</li></ul>`
        });
          $("#results").html(html)

      });

  });
});
