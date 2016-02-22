//requirements
var express = require('express'),
		router 	= express.Router();

//require models
var User		=	require('../models/users'),
		Cookie 	=	require('../models/cookies');

//route to make user page (homepage)
router.get('/', function (req, res){ 
	//find all cookies
	Cookie.find(function(err,cookies){
		res.render('users/homepage.ejs', { cookies });
	})	
})



module.exports = router;