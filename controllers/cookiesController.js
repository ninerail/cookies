//requirements
var express = require('express'),
		router 	= express.Router();

//get schema from the model
var Cookie	=	require('../models/cookies');
var User    = require('../models/users');

//route to make cookies page (not public)
router.get('/', function (req, res){ 
	res.render('cookies/addform.ejs');
})

//route to get inputs from make cookies page
router.post('/', function(req, res){
	Cookie.create(req.body, function(err, user){
		console.log('COOKIE CREATED');
		res.redirect('/cookies');
	})
})

//route to display cookies in the database
router.get('/json', function (req, res){
	Cookie.find(function(err, cookies) {
		res.render(cookies);
	});
});

//route to display individual cookie show page
router.get('/:id', function(req, res){
	res.locals.login = (req.isAuthenticated());
	Cookie.findById(req.params.id, function (err, cookie){
		res.render('cookies/show.ejs', {cookie: cookie});
	});
});

//============
// The big sucker
//===========

//route to get boxes ordered from show page
router.post('/:id', function(req, res){

	//find the cookie matching the id param
	Cookie.findById(req.params.id, function (err, cookie){
		//find the user matching req.user.id
		User.findById(req.user.id, function (err, user){
			//get cookie id
			var cookieId = cookie.id;

			//get quantity ordered
			var quantity = parseInt(req.body.boxes);

			//make an object
			var formEntry = { [cookieId] : quantity };

			//push the object to user
			user.order.push(formEntry);

			//save it
			user.save(function(err) {
				res.redirect('/users');
			});
		});
	});
});


module.exports = router;