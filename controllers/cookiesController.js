//requirements
var express = require('express'),
		router 	= express.Router();

//get schema from the model
var Cookie	=	require('../models/cookies');

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
	Cookie.findById(req.params.id, function (err, cookie){
		res.render('cookies/show.ejs', {cookie: cookie});
	});
});

//route to get boxes ordered from show page
router.post('/:id', function(req, res){
	console.log('it works!');
})


module.exports = router;