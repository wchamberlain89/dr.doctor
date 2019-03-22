import $ from 'jquery';
import './scss/styles.scss';
import {DrApi} from './js/classes/drApi.js';
import {Geocode} from './js/classes/geocode.js';
import {apiController} from './js/functions/promise.js';

$(document).ready(function(){

	const apiControl = new apiController;

	const drApi = new DrApi();
  drApi.getDoctors = apiControl.setGet(drApi.baseURL + 'doctors');
	
	const geocodeApi = new Geocode();
	geocodeApi.getByGeocode = apiControl.setGet(geocodeApi.baseURL + 'geocode');

	console.log(geocodeApi.getByGeocode);

  $("form").on("submit",(event) => {
  	event.preventDefault();
  	
  	const query = $("#search").val();
  	
  	geocodeApi.getByGeocode()
		
  });
});
