import $ from 'jquery';
import './scss/styles.scss';
import {DoctorApi} from './js/classes/doctorapi.js';

$(document).ready(function(){
	const doctorApi = new DoctorApi();

  $("form").on("submit",() => {
  	const query = $("#search").val();
  	console.log(query);
  	console.log(process.env.exports.apiKey);
  	// const promise = doctorApi.get(query);
  	event.preventDefault();
  });
});
