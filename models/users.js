//require mongoose
var mongoose = require('mongoose');

//bring in the cookies schema
var cookiesSchema = require('./cookies').schema;

//require bcrypt
bcrypt = require('bcrypt-nodejs');

//make user schema in mongoose
var userSchema = mongoose.Schema({

	//first name
	firstname: String,

	//last name
	lastname: String,

	//email
	email: String,

	//password
	password: String,

	//array of cookies ordered
	order: []

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//export user schema
module.exports = mongoose.model('User', userSchema);