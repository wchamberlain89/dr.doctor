import $ from 'jquery';
import './scss/styles.scss';
import {DoctorApi} from './js/classes/doctorapi.js';

$(document).ready(function(){
	const doctorApi = new DoctorApi();

  $("form").on("submit",() => {
  	const query = $("#search").val();
  	const promise = doctorApi.get(query);
  	
  	event.preventDefault();

  	promise.then((res) => {
  		console.log(res);
  	}, (err) => {
  		console.log(err);
  	});
  });
});
