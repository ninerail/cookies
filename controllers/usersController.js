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
	//send login variable
	res.locals.login = (req.isAuthenticated());
	//find all cookies
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

//route to cart page for checkout
router.get('/cart', function(req, res){

	//send the login variable
	res.locals.login = (req.isAuthenticated());

	var cookiedata = [];
	//send the user information
	User.findById(req.user.id, function (err, user){

		
		// user.order.forEach(function(cookieInfo) {

		// 	for (var key in cookieInfo) {

		// 		Cookie.findById(key, function(cookie) {
		// 			cookiedata.push({ 
		// 				cookietype: cookie,
		// 				qty: cookieInfo[key]
		// 			});
		// 		}); 

		// 	}; 

		// 	console.log(cookiedata);

		// });

		//find and send info for all cookies
		Cookie.find(function(err,cookies){

			//render the cart ejs with cookies and user
			res.render('users/cart.ejs', {user: user, cookies: cookies});
		});
	});
});

//route to finish page
router.get('/finish', function(req, res){

		//find user by id
		res.render('users/finish.ejs');
});

//route to admin page (not visible to public)
router.get('/admin', function(req, res){

	//find the user information
	User.find(function(err, user){

		//find the cookie information
		Cookie.find(function(err, cookies){

			//render admin page with all user and cookie data
			res.render('users/admin.ejs', {user : user, cookies: cookies});

		});
	});
});

//route to delete order data
router.delete('/cart', function(req, res){
	//find user by id
	User.findByIdAndUpdate(req.user.id, { order : [] }, function(err, user){

		//empty the array
		req.user.order = [];

		//save it
		user.save(function(err){
			res.redirect('/users/cart');
		})
	})
});





// //route to render homepage with user logged in
// router.get('/:id', function(req, res){
// 	User.findById(req.params.id, function(err, user){
// 		res.render('users/homepage.ejs', { user: user });
// 	});
//});


//route to make cart page



module.exports = router;