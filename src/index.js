import $ from 'jquery';
import './scss/styles.scss';
import {DoctorApi} from './js/classes/doctor_api.js';
import {GeocodeApi} from './js/classes/geocode_api.js';
import {setUrl} from './js/functions/promise.js';
$(document).ready(function(){
	
	const drApi = new DoctorApi();
	const doctorUrl = drApi.baseURL + 'doctors';
  drApi.getDoctors = setUrl(doctorUrl);
  console.log(drApi.getDoctors)
	const geocodeApi = new GeocodeApi();

  $("form").on("submit",(event) => {
  	
  	const query = $("#search").val();
  	
  	console.log("hello");
  	const locPromise = geocodeApi.get();
  	
  	event.preventDefault();
		
		locPromise.then((res) => {
  		const location = JSON.parse(res).results[0];
  		const lat = location.location.lat;
  		const lng = location.location.lng;
  		const promise = drApi.apiCall(query, {lat: lat, lng: lng});
  	}, (err) => {
  		console.log(err);
  	})
  	.then((res) => {
  		console.log(res);
  	});
  });
});
