export function setURL(url) {
	console.log(`stored ${url} in setURL function`);
	return function (parameters)  {
		return new Promise(function(resolveFunction, rejectFunction) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${parameters.query}&user_key=${process.env.exports.apiKey}`;

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