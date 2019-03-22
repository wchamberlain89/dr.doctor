export class GeocodeApi {
	get() {
    return new Promise(function(resolveFunction, rejectFunction) {
      let request = new XMLHttpRequest();
      let url = `https://api.geocod.io/v1.3/geocode?q=portland&api_key=${process.env.GEOCODE_KEY}`;

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