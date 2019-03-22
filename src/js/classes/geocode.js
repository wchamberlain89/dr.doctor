export class Geocode {
	constructor() {
		this.baseUrl = 'https://api.geocod.io/v1.3/geocode'
		this.keyName = 'api_key'
		this.key = process.env.GEOCODE_KEY;
	}
}