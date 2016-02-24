//Requirements
var express					= require('express');
var bodyParser			= require('body-parser');
var	methodOverride	= require('method-override');
var	mongoose				=	require('mongoose');
var	port 						= process.env.PORT || 3000;
var	app							= express();
var passport        = require('passport');
var morgan          = require('morgan');
var session         = require('express-session');
    
require('./config/passport.js')(passport);

//Create mongodb database
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/cookies';
mongoose.connect(mongoUri);

//Require controllers for my two models
usersController 	= require('./controllers/usersController');
cookiesController = require('./controllers/cookiesController');

//serve images, CSS files, and JavaScript files in public directory
app.use(express.static('public'));

//middleware; for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middlewear for passport
app.use(session({ name: 'whut', secret: 'secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

//middleware for method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//middleware
app.use('/users', usersController);
app.use('/cookies', cookiesController);

//start at the users page
app.get('/', function(req, res) {
	res.redirect('/users');
})

//Console log that server is running
app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});