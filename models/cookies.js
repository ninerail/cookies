//require mongoose
var mongoose = require('mongoose');

//establish cookie schema
var cookieSchema = mongoose.Schema({
	
	cookiename: String,
	img: String,
	headline: String,
	description: String,
});

//export
module.exports = mongoose.model('Cookie', cookieSchema);