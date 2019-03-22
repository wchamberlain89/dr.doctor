export const get = (url) => {
  
  return () => {

    return new Promise((resolveFunction, rejectFunction) => {
      let request = new XMLHttpRequest();
      console.log("promise returned")
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