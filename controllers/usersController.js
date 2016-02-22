//requirements
var express = require('express'),
		router 	= express.Router();

//require models
var User		=	require('../models/users'),
		Cookie 	=	require('../models/cookies');

//require passport
var passport = require('passport');

//route to make user page (homepage)
router.get('/', function (req, res){ 
	//find all cookies
	res.locals.login = (req.isAuthenticated());
	console.log(res.locals.login);
	Cookie.find(function(err,cookies){
		res.render('users/homepage.ejs', { cookies });
	})	
})


//route to make new user
// process the signup form
router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
}));

// process the login form
router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/', // redirect back to the signup page if there is an error
}));

//route to logout user
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

//route to make json test page for users
router.get('/json', function(req, res){
	User.find(function(err, user){
		res.send(user);
	})
})

//route to make json test page for individual user
router.get('/:id/json', function(req, res){
	User.findById(req.params.id, function(err, user){
		res.send(user);
	});
});

//route to summary page, not visible to public
router.get('/summary', function(req, res){
	res.send('hi');
	//res.send(User);
})

// //route to render homepage with user logged in
// router.get('/:id', function(req, res){
// 	User.findById(req.params.id, function(err, user){
// 		res.render('users/homepage.ejs', { user: user });
// 	});
//});


//route to make cart page



module.exports = router;