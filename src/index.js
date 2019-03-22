import $ from 'jquery';
import './scss/styles.scss';

$(document).ready(function(){
  $("form").on("submit",() => {
  	console.log("hello");
  	event.preventDefault();
  });
});
