export class DoctorApi {
	get(query) {
    return new Promise(function(resolveFunction, rejectFunction) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&user_key=${process.env.exports.apiKey}`;

      request.onload = function() {
        if (this.status === 200) {
          resolveFunction(request.response);
        } else {
          rejectFunction(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();
    });
  }
}