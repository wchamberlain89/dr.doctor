import $ from 'jquery';
import './scss/styles.scss';
import {Api} from './js/classes/Api.js'

function getLocationString(array) {
  return `${array.lat}%2C${array.lng}%2C100`;
}

$(document).ready(function(){

  const geocode = new Api('https://api.geocod.io/v1.3/geocode', 'api_key', process.env.GEOCODE_KEY);
  const drApi = new Api("https://api.betterdoctor.com/2016-03-01/doctors", 'user_key', process.env.exports.apiKey);
  
  $("form").on("submit",(event) => {
  	event.preventDefault();
  	const query = $("#search").val();
  	
    const url = geocode.generateUrl({city : 'portland', state: 'or', [geocode.keyName]: geocode.key});
    
    geocode.get(url)
      .then((response) => {
        const results = JSON.parse(response);
        const location = getLocationString(results.results[0].location);
        const url = drApi.generateUrl({location: location, q: query, [drApi.keyName]: drApi.key})
        return drApi.get(url);
      }) 
      .then((response) => {
        response = JSON.parse(response);
        const data = response.data.map((doctor) => {
          return {profile : doctor.profile, address : doctor.practices[0].visit_address, phones : doctor.practices[0].phones}
        });
          let html = "";
        if(data.length > 0) {
          data.forEach((doctor) => {
            html += `<ul>${doctor.profile.first_name} ${doctor.profile.last_name}
            <li>${doctor.address.street} ${doctor.address.city} ${doctor.address.state_long}</li></ul>`
          });
        } else {
          html += `<span>We're sorry but your search yielded no results</span>`;
        }
          $("#results").html(html)

        });

  });
});
