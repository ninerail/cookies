//require mongoose
var mongoose = require('mongoose');

//bring in the cookies schema
var cookiesSchema = require('./cookies').schema;

//make user schema in mongoose
var userSchema = mongoose.Schema({

	//first name
	firstname: String,

	//last name
	lastname: String,

	//email
	email: String,

	//cookies array

});

//export user schema
module.exports = mongoose.model('User', userSchema);