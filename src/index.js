import $ from 'jquery';
import './scss/styles.scss';
import {DoctorApi} from './js/classes/doctor_api.js';
import {GeocodeApi} from './js/classes/geocode_api.js'
$(document).ready(function(){
	const doctorApi = new DoctorApi();
	const geocodeApi = new GeocodeApi();
	
  $("form").on("submit",() => {
  	const query = $("#search").val();
  	const promise = doctorApi.get(query);
  	const promise2 = geocodeApi.get();
  	
  	event.preventDefault();

  	promise.then((res) => {
  		console.log(res);
  	}, (err) => {
  		console.log(err);
  	});

  	promise2.then((res) => {
  		console.log(res);
  	}, (err) => {
  		console.log(err);
  	});
  });
});
