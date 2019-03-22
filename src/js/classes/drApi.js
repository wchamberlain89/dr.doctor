export class DrApi {
  constructor() {
    this.baseUrl = 'https://api.betterdoctor.com/2016-03-01/doctors';
    this.keyName = 'user_key';
		this.key = process.env.exports.apiKey;
  }
}