import $ from 'jquery';
import './scss/styles.scss';
import {DrApi} from './js/classes/drApi.js';
import {Geocode} from './js/classes/geocode.js';
import {setUrl} from './js/functions/promise.js';

function parseParams(parameters) {
  return Object.keys(parameters).reduce((acc, key, index) => {
    return acc += key + "=" + parameters[key] + "&";
  }, "?");
}


$(document).ready(function(){

  const drApi = new DrApi();
  drApi.getDoctors = setUrl(drApi.baseURL + 'doctors');

  const geocodeApi = new Geocode();
  geocodeApi.getByGeocode = setUrl(geocodeApi.baseURL + 'geocode');

  $("form").on("submit",(event) => {
  	event.preventDefault();
  	
  	const query = $("#search").val();
  	
    const geocodeParams = parseParams({city : 'portland', state: 'or'});

    geocodeApi.getByGeocode(geocodeParams)
    .then((res) => {
     console.log(res);
   });

  });
});
