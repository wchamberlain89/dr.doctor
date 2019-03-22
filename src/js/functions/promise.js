export function setUrl(url) {
  return function (parameters)  {

    return new Promise(function(resolveFunction, rejectFunction) {
      let request = new XMLHttpRequest();
      console.log(url)
      url = url + parameters;
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