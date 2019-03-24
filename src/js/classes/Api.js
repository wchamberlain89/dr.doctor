export class Api {
	constructor(baseUrl, keyName, key) {
		this.baseUrl = baseUrl;
		this.keyName = keyName;
		this.key = key;
	}

	get(url) {
		return new Promise((resolveFunction, rejectFunction) => {
			let request = new XMLHttpRequest();
			console.log("making api call");
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

	parametersToString(parameters) {
		return Object.keys(parameters).reduce((acc, key) => {
			return acc += key + "=" + parameters[key] + "&";
		}, "?");
	}

	generateUrl(parameters) {
		let output = this.baseUrl + this.parametersToString(parameters);
		return output.substring(0, output.length - 1);
	}
}